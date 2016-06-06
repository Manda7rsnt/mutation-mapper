/*
 * Copyright (c) 2015 Memorial Sloan-Kettering Cancer Center.
 *
 * This library is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY, WITHOUT EVEN THE IMPLIED WARRANTY OF MERCHANTABILITY OR FITNESS
 * FOR A PARTICULAR PURPOSE. The software and documentation provided hereunder
 * is on an "as is" basis, and Memorial Sloan-Kettering Cancer Center has no
 * obligations to provide maintenance, support, updates, enhancements or
 * modifications. In no event shall Memorial Sloan-Kettering Cancer Center be
 * liable to any party for direct, indirect, special, incidental or
 * consequential damages, including lost profits, arising out of the use of this
 * software and its documentation, even if Memorial Sloan-Kettering Cancer
 * Center has been advised of the possibility of such damage.
 */

/*
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

/**
 * This class is designed to retrieve PFAM data on demand.
 *
 * @param options  additional options
 *
 * @author Selcuk Onur Sumer
 */
function PancanMutationDataProxy(options)
{
	var self = this;

	// default options
	var _defaultOpts = {
		servletName: "pancancerMutations.json"
	};

	// merge options with default options to use defaults for missing values
	var _options = jQuery.extend(true, {}, _defaultOpts, options);

	// call super constructor to init options and other params
	AbstractDataProxy.call(this, _options);
	_options = self._options;

	// map of <keyword, data> pairs
	var _cacheByKeyword = {};
	// map of <proteinChange, data> pairs
	var _cacheByProteinChange = {};
	// map of <proteinPosStart, data> pairs
	var _cacheByProteinPosition = {};
	// map of <gene, data> pairs
	var _cacheByGeneSymbol = {};

	/**
	 * Initializes with full data. Once initialized with full data,
	 * this proxy class assumes that there will be no additional data.
	 *
	 * @param options   data proxy options
	 */
	function fullInit(options)
	{
		var data = options.data;

		_cacheByKeyword = data.byKeyword;
		_cacheByProteinChange = data.byProteinChange;
		_cacheByGeneSymbol = data.byGeneSymbol;
		_cacheByProteinPosition = data.byProteinPosition;
	}

	function getPancanData(servletParams, mutationUtil, callback)
	{
		var cmd = servletParams.cmd;
		var q = servletParams.q;

		var data = null;
		var toQuery = null;

		if (cmd == null)
		{
			// no command provided, nothing to retrieve
			callback(null);
		}
		else if (cmd == "byKeywords")
		{
			// if no query params (keywords) provided, use all available
			var keywords = (q == null) ? mutationUtil.getAllKeywords() : q.split(",");
			getData(cmd, keywords, _cacheByKeyword, ["keyword"], callback);
		}
		else if (cmd == "byHugos")
		{
			// if no query params (genes) provided, use all available
			var genes = (q == null) ? mutationUtil.getAllGenes() : q.split(",");
			getData(cmd, genes, _cacheByGeneSymbol, ["hugo"], callback);
		}
		else if (cmd == "byProteinChanges")
		{
			// if no query params (genes) provided, use all available
			var proteinChanges = (q == null) ? mutationUtil.getAllProteinChanges() : q.split(",");
			getData(cmd, proteinChanges, _cacheByProteinChange, ["protein_change"], callback);
		}
		else if (cmd == "byProteinPos")
		{
			// if no query params (genes) provided, use all available
			var proteinPositions = (q == null) ? mutationUtil.getAllProteinPosStarts() : q.split(",");
			getData(cmd, proteinPositions, _cacheByProteinPosition, ["hugo", "protein_pos_start"], callback);
		}
		else
		{
			// invalid command
			callback(null);
		}
	}

	/**
	 * Retrieves the data from the cache and/or server.
	 *
	 * @param cmd       cmd (byHugos or byKeyword)
	 * @param keys      keys used to get cached data
	 * @param cache     target cache (byKeyword or byGeneSymbol)
	 * @param fields     field names to be used as a cache key
	 * @param callback  callback function to forward the data
	 */
	function getData(cmd, keys, cache, fields, callback)
	{
		// get cached data
		var data = getCachedData(keys, cache);
		// get keywords to query
		var toQuery = getQueryContent(data);

		if (toQuery.length > 0 &&
		    !self.isFullInit())
		{
			// retrieve missing data from the servlet
			var ajaxOpts = {
				type: "POST",
				url: _options.servletName,
				data: {cmd: cmd, q: toQuery.join(",")},
				success: function(response) {
					processData(response, data, cache, fields, callback);
				},
				dataType: "json"
			};

			self.requestData(ajaxOpts);
		}
		// everything is already cached (or full init)
		else
		{
			processData([], data, cache, fields, callback);
		}
	}

	/**
	 * Processes and caches the raw data.
	 *
	 * @param response  raw data
	 * @param data      previously cached data (for provided keys)
	 * @param cache     target cache (byKeyword or byGeneSymbol)
	 * @param fields     field names to be used as a cache key
	 * @param callback  callback function to forward the processed data
	 */
	function processData (response, data, cache, fields, callback) {
		_.each(response, function(ele, idx) {
			var keyValues = [];

			_.each(fields, function(field, idx){
				keyValues.push(ele[field]);
			});

			var key = keyValues.join("_");

			// init the list if not init yet
			if (cache[key] == null)
			{
				cache[key] = [];
			}

			if (data[key] == null)
			{
				data[key] = [];
			}

			// add data to the cache
			cache[key].push(ele);
			data[key].push(ele);
		});

		var dataArray = [];
		_.each(data, function(ele) {
			dataArray = dataArray.concat(ele);
		});

		// forward the processed data to the provided callback function
		callback(dataArray);
	}

	/**
	 * Get already cached data for the given keys.
	 * Returned object has null data for not-yet-cached keys.
	 *
	 * @param keys      cache keys
	 * @param cache     data cache
	 * @returns {Object} cached data as a map
	 */
	function getCachedData(keys, cache)
	{
		var data = {};

		_.each(keys, function(key) {
			data[key] = cache[key];
		});

		return data;
	}

	/**
	 * Returns the list of keys to query.
	 *
	 * @param data  map of <key, data> pairs
	 * @returns {Array}     list of keys to query
	 */
	function getQueryContent(data)
	{
		// keys to query
		var toQuery = [];

		_.each(_.keys(data), function(key) {
			// data not cached yet for the given key
			if (data[key] == null)
			{
				toQuery.push(key);
			}
		});

		return toQuery
	}

	// override required base functions
	self.fullInit = fullInit;

	// class specific functions
	self.getPancanData = getPancanData;
}

// PancanMutationDataProxy extends AbstractDataProxy...
PancanMutationDataProxy.prototype = new AbstractDataProxy();
PancanMutationDataProxy.prototype.constructor = PancanMutationDataProxy;
