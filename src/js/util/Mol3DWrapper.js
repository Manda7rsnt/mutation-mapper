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

var $ = require("jquery");
var jQuery = $;
var _ = require("underscore");

/**
 * Utility class to initialize the 3D mutation visualizer with 3Dmol.js
 *
 * Note: This class is assumed to have the same interface
 * (the same signature for all public functions) with the JmolWrapper.
 *
 * @author Selcuk Onur Sumer
 */
function Mol3DWrapper()
{
	// TODO default options
	var defaultOpts = {};

	var _options = null;
	var _viewer = null;

	/**
	 * Initializes the visualizer.
	 *
	 * @param name      name of the application
	 * @param options   app options
	 */
	function init(name, options)
	{
		_options = jQuery.extend(true, {}, defaultOpts, options);

		// update wrapper reference
		$(options.el).append("<div id='" + name + "' " +
			"style='width: " + _options.width + "px; height: " + _options.height +
			"px; margin: 0; padding: 0; border: 0;'></div>");
		var wrapper = $("#" + name);
		wrapper.hide();

		var viewer = $3Dmol.createViewer(wrapper,
			{defaultcolors: $3Dmol.elementColors.rasmol});
		viewer.setBackgroundColor(0xffffff);

		_viewer = viewer;
	}

	/**
	 * Updates the container of the visualizer object.
	 *
	 * @param container container selector
	 */
	function updateContainer(container)
	{
		// move visualizer into its new container
		if (_viewer != null)
		{
			_viewer.setContainer(container);
		}
	}

	/**
	 * Runs the given command as a script on the 3D visualizer object.
	 *
	 * @param command   command to send
	 * @param callback  function to call after execution of the script
	 */
	function script(command, callback)
	{
		if (command != null &&
		    _viewer != null)
		{
			// render after running the script
			_viewer.render();
		}

		// call the callback function after script completed
		if(_.isFunction(callback))
		{
			callback();
		}
	}

	function getViewer()
	{
		return _viewer;
	}

	return {
		init: init,
		updateContainer: updateContainer,
		getViewer: getViewer,
		script: script
	};
}

module.exports = Mol3DWrapper;