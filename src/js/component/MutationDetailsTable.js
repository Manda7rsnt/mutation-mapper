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
 * MutationDetailsTable class (extends AdvancedDataTable)
 *
 * Highly customizable table view built on DataTables plugin.
 * See default options object (_defaultOpts) for details.
 *
 * With its default configuration, following events are dispatched by this class:
 * - MutationDetailsEvents.PDB_LINK_CLICKED:
 *   dispatched when clicked on a 3D link (in the protein change column)
 * - MutationDetailsEvents.PROTEIN_CHANGE_LINK_CLICKED:
 *   dispatched when clicked on the protein change link (in the protein change column)
 * - MutationDetailsEvents.MUTATION_TABLE_FILTERED:
 *   dispatched when the table is filter by a user input (via the search box)
 *
 * @param options       visual options object
 * @param gene          hugo gene symbol
 * @param mutationUtil  mutation details util
 * @param dataProxies   all available data proxies
 * @param dataManager   mutation data manager for additional data requests
 * @constructor
 *
 * @author Selcuk Onur Sumer
 */
function MutationDetailsTable(options, gene, mutationUtil, dataProxies, dataManager)
{
	var self = this;

	// default options object
	var _defaultOpts = {
		el: "#mutation_details_table_d3",
		//elWidth: 740, // width of the container
		// default column options
		//
		// sTitle: display value
		// tip: tooltip value of the column header
		//
		// [data table options]: sType, sClass, sWidth, asSorting, ...
		columns: {
			datum: {sTitle: "datum",
				tip: ""},
			mutationId: {sTitle: "Mutation ID",
				tip: "Mutation ID",
				sType: "string"},
			mutationSid: {sTitle: "Mutation SID",
				tip: "",
				sType: "string"},
			caseId: {sTitle: "Sample ID",
				tip: "Sample ID",
				sType: "string"},
			cancerStudy: {sTitle: "Cancer Study",
				tip: "Cancer Study",
				sType: "string"},
			tumorType: {sTitle: "Cancer Type",
				tip: "Cancer Type",
				sType: "string"},
			proteinChange: {sTitle: "AA change",
				tip: "Protein Change",
				sType: "numeric"},
			mutationType: {sTitle: "Type",
				tip: "Mutation Type",
				sType: "string",
				sClass: "center-align-td"},
			cna: {sTitle: "Copy #",
				tip: "Copy-number status of the mutated gene",
				sType: "numeric",
				sClass: "center-align-td"},
			cosmic: {sTitle: "COSMIC",
				tip: "Overlapping mutations in COSMIC",
				sType: "numeric",
				sClass: "right-align-td",
				asSorting: ["desc", "asc"]},
			mutationStatus: {sTitle: "MS",
				tip: "Mutation Status",
				sType: "string",
				sClass: "center-align-td"},
			validationStatus: {sTitle: "VS",
				tip: "Validation Status",
				sType: "string",
				sClass: "center-align-td"},
			mutationAssessor: {sTitle: "Mutation Assessor",
				tip: "Predicted Functional Impact Score (via Mutation Assessor) for missense mutations",
				sType: "numeric",
				sClass: "center-align-td",
				asSorting: ["desc", "asc"],
				sWidth: "2%"},
			sequencingCenter: {sTitle: "Center",
				tip: "Sequencing Center",
				sType: "string",
				sClass: "center-align-td"},
			chr: {sTitle: "Chr",
				tip: "Chromosome",
				sType: "string"},
			startPos: {sTitle: "Start Pos",
				tip: "Start Position",
				sType: "numeric",
				sClass: "right-align-td"},
			endPos: {sTitle: "End Pos",
				tip: "End Position",
				sType: "numeric",
				sClass: "right-align-td"},
			referenceAllele: {sTitle: "Ref",
				tip: "Reference Allele",
				sType: "string"},
			variantAllele: {sTitle: "Var",
				tip: "Variant Allele",
				sType: "string"},
			tumorFreq: {sTitle: "Allele Freq (T)",
				tip: "Variant allele frequency<br> in the tumor sample",
				sType: "numeric",
				sClass: "right-align-td",
				asSorting: ["desc", "asc"]},
			normalFreq: {sTitle: "Allele Freq (N)",
				tip: "Variant allele frequency<br> in the normal sample",
				sType: "numeric",
				sClass: "right-align-td",
				asSorting: ["desc", "asc"]},
			tumorRefCount: {sTitle: "Var Ref",
				tip: "Variant Ref Count",
				sType: "numeric",
				sClass: "right-align-td",
				asSorting: ["desc", "asc"]},
			tumorAltCount: {sTitle: "Var Alt",
				tip: "Variant Alt Count",
				sType: "numeric",
				sClass: "right-align-td",
				asSorting: ["desc", "asc"]},
			normalRefCount: {sTitle: "Norm Ref",
				tip: "Normal Ref Count",
				sType: "numeric",
				sClass: "right-align-td",
				asSorting: ["desc", "asc"]},
			normalAltCount: {sTitle: "Norm Alt",
				tip: "Normal Alt Count",
				sType: "numeric",
				sClass: "right-align-td",
				asSorting: ["desc", "asc"]},
			igvLink: {sTitle: "BAM",
				tip: "Link to BAM file",
				sType: "string",
				sClass: "center-align-td"},
			mutationCount: {sTitle: "#Mut in Sample",
				tip: "Total number of<br> nonsynonymous mutations<br> in the sample",
				sType: "numeric",
				sClass: "right-align-td",
				asSorting: ["desc", "asc"],
				sWidth: "2%"},
			cBioPortal: {sTitle: "cBioPortal",
				tip: "Mutation frequency in cBioPortal",
				sType: "numeric",
				sClass: "right-align-td",
				asSorting: ["desc", "asc"]}
		},
		// display order of column headers
		columnOrder: [
			"datum", "mutationId", "mutationSid", "caseId", "cancerStudy", "tumorType",
			"proteinChange", "mutationType", "cna", "cBioPortal", "cosmic", "mutationStatus",
			"validationStatus", "mutationAssessor", "sequencingCenter", "chr",
			"startPos", "endPos", "referenceAllele", "variantAllele", "tumorFreq",
			"normalFreq", "tumorRefCount", "tumorAltCount", "normalRefCount",
			"normalAltCount", "igvLink", "mutationCount"
		],
		// Indicates the visibility of columns
		//
		// - Valid string constants:
		// "visible": column will be visible initially
		// "hidden":  column will be hidden initially,
		// but user can unhide the column via show/hide option
		// "excluded": column will be hidden initially,
		// and the user cannot unhide the column via show/hide option
		//
		// - Custom function: It is also possible to set a custom function
		// to determine the visibility of a column. A custom function
		// should return one of the valid string constants defined above.
		// For any unknown visibility value, column will be hidden by default.
		//
		// All other columns will be initially hidden by default.
		columnVisibility: {
			"datum": "excluded",
			"proteinChange": "visible",
			"caseId": function (util, gene) {
				if (util.containsCaseId(gene)) {
					return "visible";
				}
				else {
					return "hidden";
				}
			},
			"mutationType": function (util, gene) {
				if (util.containsMutationType(gene)) {
					return "visible";
				}
				else {
					return "hidden";
				}
			},
			"mutationAssessor": function (util, gene) {
				if (util.containsFis(gene)) {
					return "visible";
				}
				else {
					return "hidden";
				}
			},
//			"cosmic": function (util, gene) {
//				if (util.containsCosmic(gene)) {
//					return "visible";
//				}
//				else {
//					return "hidden";
//				}
//			},
			"cosmic": "visible",
			"mutationCount": function (util, gene) {
				if (util.containsMutationCount(gene)) {
					return "visible";
				}
				else {
					return "hidden";
				}
			},
			"mutationId": "excluded",
			"mutationSid": "excluded",
			"cancerStudy": "excluded",
			// TODO we may need more parameters than these two (util, gene)
			"cna" : function (util, gene) {
				if (util.containsCnaData(gene)) {
					return "visible";
				}
				else {
					return "hidden";
				}
			},
			"tumorFreq": function (util, gene) {
				if (util.containsAlleleFreqT(gene)) {
					return "visible";
				}
				else {
					return "hidden";
				}
			},
			"igvLink": function (util, gene) {
				if (util.containsIgvLink(gene)) {
					return "visible";
				}
				else {
					//return "excluded";
					return "hidden";
				}
			},
			"mutationStatus": function (util, gene) {
				if (util.containsGermline(gene)) {
					return "visible";
				}
				else {
					return "hidden";
				}
			},
			"validationStatus": function (util, gene) {
				if (util.containsValidStatus(gene)) {
					return "visible";
				}
				else {
					return "hidden";
				}
			},
			"tumorType": function (util, gene) {
				var count = util.distinctTumorTypeCount(gene);

				if (count > 1) {
					return "visible";
				}
				else if (count > 0) {
					return "hidden";
				}
				else { // if (count <= 0)
					//return "excluded";
					return "hidden";
				}
			},
			//"cBioPortal": function (util, gene) {
			//	if (util.containsKeyword(gene) ||
			//	    util.containsMutationEventId(gene))
			//	{
			//		return "visible";
			//	}
			//	else {
			//		return "excluded";
			//	}
			//}
			"cBioPortal": "excluded"
		},
		// Indicates whether a column is searchable or not.
		// Should be a boolean value or a function.
		//
		// All other columns will be initially non-searchable by default.
		columnSearch: {
			"caseId": true,
			"mutationId": true,
			"mutationSid": true,
			"cancerStudy": true,
			"proteinChange": true,
			"tumorType": true,
			"mutationType": true
		},
		// renderer functions:
		// returns the display value for a column (may contain html elements)
		// if no render function is defined for a column,
		// then we rely on a custom "mData" function.
		columnRender: {
			"mutationId": function(datum) {
				var mutation = datum.mutation;
				var value = mutation.get("mutationId");
				if (value === undefined) {
					return "";
				}
				return value;
				//return (mutation.mutationId + "-" + mutation.mutationSid);
			},
			"mutationSid": function(datum) {
				var mutation = datum.mutation;
				var value = mutation.get("mutationSid");
				if (value === undefined) {
					return "";
				}
				return value;
			},
			"caseId": function(datum) {
				var mutation = datum.mutation;
				var caseIdFormat = MutationDetailsTableFormatter.getCaseId(mutation.get("caseId"));
				var vars = {};
				vars.linkToPatientView = mutation.get("linkToPatientView");
				vars.caseId = caseIdFormat.text;
				vars.caseIdClass = caseIdFormat.style;
				vars.caseIdTip = caseIdFormat.tip;

				var templateFn = BackboneTemplateCache.getTemplateFn("mutation_table_case_id_template");
				return templateFn(vars);
			},
			"proteinChange": function(datum) {
				var mutation = datum.mutation;

				// check if data exists,
				// if not we need to retrieve it from the data manager
				if (_.isUndefined(mutation.get("proteinChange")))
				{
					self.requestColumnData("variantAnnotation", "proteinChange");
					return MutationViewsUtil.renderTablePlaceHolder();
				}
				else
				{
					var proteinChange = MutationDetailsTableFormatter.getProteinChange(mutation);
					var vars = {};

					vars.proteinChange = proteinChange.text;
					vars.proteinChangeClass = proteinChange.style;
					vars.proteinChangeTip = proteinChange.tip;
					vars.additionalProteinChangeTip = proteinChange.additionalTip;

					// check if pdbMatch data exists,
					// if not we need to retrieve it from the data manager
					if (_.isUndefined(mutation.get("pdbMatch")))
					{
						self.requestColumnData("pdbMatch", "proteinChange");
					}

					vars.pdbMatchLink = MutationDetailsTableFormatter.getPdbMatchLink(mutation);

					var templateFn = BackboneTemplateCache.getTemplateFn("mutation_table_protein_change_template");
					return templateFn(vars);
				}
			},
			"cancerStudy": function(datum) {
				var mutation = datum.mutation;
				var vars = {};
				//vars.cancerType = mutation.cancerType;
				vars.cancerStudy = mutation.get("cancerStudy");
				vars.cancerStudyShort = mutation.get("cancerStudyShort");
				vars.cancerStudyLink = mutation.get("cancerStudyLink");

				var templateFn = BackboneTemplateCache.getTemplateFn("mutation_table_cancer_study_template");
				return templateFn(vars);
			},
			"tumorType": function(datum) {
				var mutation = datum.mutation;
				var tumorType = MutationDetailsTableFormatter.getTumorType(mutation);
				var vars = {};
				vars.tumorType = tumorType.text;
				vars.tumorTypeClass = tumorType.style;
				vars.tumorTypeTip = tumorType.tip;

				var templateFn = BackboneTemplateCache.getTemplateFn("mutation_table_tumor_type_template");
				return templateFn(vars);
			},
			"mutationType": function(datum) {
				var mutation = datum.mutation;

				// check if data exists,
				// if not we need to retrieve it from the data manager
				if (_.isUndefined(mutation.get("mutationType")))
				{
					self.requestColumnData("variantAnnotation", "mutationType");
					return MutationViewsUtil.renderTablePlaceHolder();
				}
				else
				{
					var mutationType = MutationDetailsTableFormatter.getMutationType(mutation.get("mutationType"));
					var vars = {};
					vars.mutationTypeClass = mutationType.style;
					vars.mutationTypeText = mutationType.text;

					var templateFn = BackboneTemplateCache.getTemplateFn("mutation_table_mutation_type_template");
					return templateFn(vars);
				}
			},
			"cosmic": function(datum) {
				var mutation = datum.mutation;
				var cosmic = MutationDetailsTableFormatter.getCosmic(mutation.getCosmicCount());
				var vars = {};
				vars.cosmicClass = cosmic.style;
				vars.cosmicCount = cosmic.count;

				var templateFn = BackboneTemplateCache.getTemplateFn("mutation_table_cosmic_template");
				return templateFn(vars);
			},
			"cna": function(datum) {
				var mutation = datum.mutation;
				var cna = MutationDetailsTableFormatter.getCNA(mutation.get("cna"));
				var vars = {};
				vars.cna = cna.text;
				vars.cnaClass = cna.style;
				vars.cnaTip = cna.tip;

				var templateFn = BackboneTemplateCache.getTemplateFn("mutation_table_cna_template");
				return templateFn(vars);
			},
			"mutationCount": function(datum) {
				var mutation = datum.mutation;
				var mutationCount = MutationDetailsTableFormatter.getIntValue(mutation.get("mutationCount"));
				var vars = {};
				vars.mutationCount = mutationCount.text;
				vars.mutationCountClass = mutationCount.style;

				var templateFn = BackboneTemplateCache.getTemplateFn("mutation_table_mutation_count_template");
				return templateFn(vars);
			},
			"normalFreq": function(datum) {
				var mutation = datum.mutation;
				var alleleCount = MutationDetailsTableFormatter.getAlleleCount(mutation.get("normalAltCount"));
				var normalFreq = MutationDetailsTableFormatter.getAlleleFreq(mutation.get("normalFreq"),
					mutation.get("normalAltCount"),
					mutation.get("normalRefCount"),
					"simple-tip");
				var vars = {};
				vars.normalFreq = normalFreq.text;
				vars.normalFreqClass = normalFreq.style;
				vars.normalFreqTipClass = normalFreq.tipClass;
				vars.normalTotalCount = normalFreq.total;
				vars.normalAltCount = alleleCount.text;

				var templateFn = BackboneTemplateCache.getTemplateFn("mutation_table_normal_freq_template");
				return templateFn(vars);
			},
			"tumorFreq": function(datum) {
				var mutation = datum.mutation;
				var alleleCount = MutationDetailsTableFormatter.getAlleleCount(mutation.get("tumorAltCount"));
				var tumorFreq = MutationDetailsTableFormatter.getAlleleFreq(mutation.get("tumorFreq"),
					mutation.get("tumorAltCount"),
					mutation.get("tumorRefCount"),
					"simple-tip");
				var vars = {};
				vars.tumorFreq = tumorFreq.text;
				vars.tumorFreqClass = tumorFreq.style;
				vars.tumorFreqTipClass = tumorFreq.tipClass;
				vars.tumorTotalCount = tumorFreq.total;
				vars.tumorAltCount = alleleCount.text;

				var templateFn = BackboneTemplateCache.getTemplateFn("mutation_table_tumor_freq_template");
				return templateFn(vars);
			},
			"mutationAssessor": function(datum) {
				var mutation = datum.mutation;
				var fis = MutationDetailsTableFormatter.getFis(
					mutation.get("functionalImpactScore"), mutation.get("fisValue"));
				var vars = {};
				vars.fisClass = fis.fisClass;
				vars.omaClass = fis.omaClass;
				vars.fisText = fis.text;

				var templateFn = BackboneTemplateCache.getTemplateFn("mutation_table_mutation_assessor_template");
				return templateFn(vars);
			},
			"mutationStatus": function(datum) {
				var mutation = datum.mutation;
				var mutationStatus = MutationDetailsTableFormatter.getMutationStatus(mutation.get("mutationStatus"));
				var vars = {};
				vars.mutationStatusTip = mutationStatus.tip;
				vars.mutationStatusClass = mutationStatus.style;
				vars.mutationStatusText = mutationStatus.text;

				var templateFn = BackboneTemplateCache.getTemplateFn("mutation_table_mutation_status_template");
				return templateFn(vars);
			},
			"validationStatus": function(datum) {
				var mutation = datum.mutation;
				var validationStatus = MutationDetailsTableFormatter.getValidationStatus(mutation.get("validationStatus"));
				var vars = {};
				vars.validationStatusTip = validationStatus.tip;
				vars.validationStatusClass = validationStatus.style;
				vars.validationStatusText = validationStatus.text;

				var templateFn = BackboneTemplateCache.getTemplateFn("mutation_table_validation_status_template");
				return templateFn(vars);
			},
			"normalRefCount": function(datum) {
				var mutation = datum.mutation;
				var alleleCount = MutationDetailsTableFormatter.getAlleleCount(mutation.get("normalRefCount"));
				var vars = {};
				vars.normalRefCount = alleleCount.text;
				vars.normalRefCountClass = alleleCount.style;

				var templateFn = BackboneTemplateCache.getTemplateFn("mutation_table_normal_ref_count_template");
				return templateFn(vars);
			},
			"normalAltCount": function(datum) {
				var mutation = datum.mutation;
				var alleleCount = MutationDetailsTableFormatter.getAlleleCount(mutation.get("normalAltCount"));
				var vars = {};
				vars.normalAltCount = alleleCount.text;
				vars.normalAltCountClass = alleleCount.style;

				var templateFn = BackboneTemplateCache.getTemplateFn("mutation_table_normal_alt_count_template");
				return templateFn(vars);
			},
			"tumorRefCount": function(datum) {
				var mutation = datum.mutation;
				var alleleCount = MutationDetailsTableFormatter.getAlleleCount(mutation.get("tumorRefCount"));
				var vars = {};
				vars.tumorRefCount = alleleCount.text;
				vars.tumorRefCountClass = alleleCount.style;

				var templateFn = BackboneTemplateCache.getTemplateFn("mutation_table_tumor_ref_count_template");
				return templateFn(vars);
			},
			"tumorAltCount": function(datum) {
				var mutation = datum.mutation;
				var alleleCount = MutationDetailsTableFormatter.getAlleleCount(mutation.get("tumorAltCount"));
				var vars = {};
				vars.tumorAltCount = alleleCount.text;
				vars.tumorAltCountClass = alleleCount.style;

				var templateFn = BackboneTemplateCache.getTemplateFn("mutation_table_tumor_alt_count_template");
				return templateFn(vars);
			},
			"startPos": function(datum) {
				var mutation = datum.mutation;

				// check if data exists,
				// if not we need to retrieve it from the data manager
				if (_.isUndefined(mutation.get("startPos")))
				{
					self.requestColumnData("variantAnnotation", "startPos");
					return MutationViewsUtil.renderTablePlaceHolder();
				}
				else
				{
					var startPos = MutationDetailsTableFormatter.getIntValue(mutation.get("startPos"));
					var vars = {};
					vars.startPos = startPos.text;
					vars.startPosClass = startPos.style;

					var templateFn = BackboneTemplateCache.getTemplateFn("mutation_table_start_pos_template");
					return templateFn(vars);
				}
			},
			"endPos": function(datum) {
				var mutation = datum.mutation;

				// check if data exists,
				// if not we need to retrieve it from the data manager
				if (_.isUndefined(mutation.get("endPos")))
				{
					self.requestColumnData("variantAnnotation", "endPos");
					return MutationViewsUtil.renderTablePlaceHolder();
				}
				else
				{
					var endPos = MutationDetailsTableFormatter.getIntValue(mutation.get("endPos"));
					var vars = {};
					vars.endPos = endPos.text;
					vars.endPosClass = endPos.style;

					var templateFn = BackboneTemplateCache.getTemplateFn("mutation_table_end_pos_template");
					return templateFn(vars);
				}
			},
			"sequencingCenter": function(datum) {
				var mutation = datum.mutation;
				var value = mutation.get("sequencingCenter");
				if (value === undefined) {
					return "";
				}
				return value;
			},
			"chr": function(datum) {
				var mutation = datum.mutation;

				// check if data exists,
				// if not we need to retrieve it from the data manager
				if (_.isUndefined(mutation.get("chr")))
				{
					self.requestColumnData("variantAnnotation", "chr");
					return MutationViewsUtil.renderTablePlaceHolder();
				}
				else
				{
					return mutation.get("chr") || "";
				}
			},
			"referenceAllele": function(datum) {
				var mutation = datum.mutation;

				// check if data exists,
				// if not we need to retrieve it from the data manager
				if (_.isUndefined(mutation.get("referenceAllele")))
				{
					self.requestColumnData("variantAnnotation", "referenceAllele");
					return MutationViewsUtil.renderTablePlaceHolder();
				}
				else
				{
					return mutation.get("referenceAllele") || "";
				}
			},
			"variantAllele": function(datum) {
				var mutation = datum.mutation;

				// check if data exists,
				// if not we need to retrieve it from the data manager
				if (_.isUndefined(mutation.get("variantAllele")))
				{
					self.requestColumnData("variantAnnotation", "variantAllele");
					return MutationViewsUtil.renderTablePlaceHolder();
				}
				else
				{
					return mutation.get("variantAllele") || "";
				}
			},
			"igvLink": function(datum) {
				//vars.xVarLink = mutation.xVarLink;
				//vars.msaLink = mutation.msaLink;
				//vars.igvLink = mutation.igvLink;
				var mutation = datum.mutation;
				var vars = {};
				vars.igvLink = MutationDetailsTableFormatter.getIgvLink(mutation);

				var templateFn = BackboneTemplateCache.getTemplateFn("mutation_table_igv_link_template");
				return templateFn(vars);
			},
			"cBioPortal": function(datum) {
				var mutation = datum.mutation;

				// check if cBioPortal data exists,
				// if not we need to retrieve it from the data manager
				if (_.isUndefined(mutation.get("cBioPortal")))
				{
					self.requestColumnData("cBioPortal");
					// TODO make the image customizable?
					return MutationViewsUtil.renderTablePlaceHolder();
				}
				else
				{
					var portal = MutationDetailsTableFormatter.getCbioPortal(mutation.get("cBioPortal"));

					var vars = {};
					vars.portalFrequency = portal.frequency;
					vars.portalClass = portal.style;

					var templateFn = BackboneTemplateCache.getTemplateFn("mutation_table_cbio_portal_template");
					return templateFn(vars);
				}
			}
		},
		// default tooltip functions
		columnTooltips: {
			"simple": function(selector, helper) {
				var qTipOptions = MutationViewsUtil.defaultTableTooltipOpts();
				cbio.util.addTargetedQTip($(selector).find('.simple-tip'), qTipOptions);

				//tableSelector.find('.best_effect_transcript').qtip(qTipOptions);
				//tableSelector.find('.cc-short-study-name').qtip(qTipOptions);
				//$('#mutation_details .mutation_details_table td').qtip(qTipOptions);
			},
			"cosmic": function(selector, helper) {
				var gene = helper.gene;
				var mutationUtil = helper.mutationUtil;
				var qTipOptions = MutationViewsUtil.defaultTableTooltipOpts();

				// add tooltip for COSMIC value
				$(selector).find('.mutation_table_cosmic').each(function() {
					var label = this;
					var mutationId = $(label).closest("tr.mutation-table-data-row").attr("id");
					var mutation = mutationUtil.getMutationIdMap()[mutationId];

					// copy default qTip options and modify "content" to customize for cosmic
					var qTipOptsCosmic = {};
					jQuery.extend(true, qTipOptsCosmic, qTipOptions);

					qTipOptsCosmic.content = {text: "NA"}; // content is overwritten on render
					qTipOptsCosmic.events = {render: function(event, api) {
						var model = {cosmic: mutation.get("cosmic"),
							keyword: mutation.get("keyword"),
							geneSymbol: gene,
							total: $(label).text()};

						var container = $(this).find('.qtip-content');

						// create & render cosmic tip view
						var cosmicView = new CosmicTipView({el: container, model: model});
						cosmicView.render();
					}};

					cbio.util.addTargetedQTip(label, qTipOptsCosmic);
				});
			},
			"mutationAssessor": function(selector, helper) {
				var gene = helper.gene;
				var mutationUtil = helper.mutationUtil;
				var qTipOptions = MutationViewsUtil.defaultTableTooltipOpts();

				// add tooltip for Predicted Impact Score (FIS)
				$(selector).find('.oma_link').each(function() {
					var mutationId = $(this).closest("tr.mutation-table-data-row").attr("id");
					var mutation = mutationUtil.getMutationIdMap()[mutationId];
					var fis = MutationDetailsTableFormatter.getFis(
						mutation.get("functionalImpactScore"), mutation.get("fisValue"));

					// copy default qTip options and modify "content"
					// to customize for predicted impact score
					var qTipOptsOma = {};
					jQuery.extend(true, qTipOptsOma, qTipOptions);

					qTipOptsOma.content = {text: "NA"}; // content is overwritten on render
					qTipOptsOma.events = {render: function(event, api) {
						// TODO this is a quickfix for dead getma.org links,
						// need to update corresponding data sources properly
						var model = {
							impact: fis.value,
							xvia: mutation.get("xVarLink").replace("getma.org", "mutationassessor.org/r2"),
							msaLink: mutation.get("msaLink").replace("getma.org", "mutationassessor.org/r2"),
							pdbLink: mutation.get("pdbLink").replace("getma.org", "mutationassessor.org/r2")
						};

						var container = $(this).find('.qtip-content');

						// create & render FIS tip view
						var fisTipView = new PredictedImpactTipView({el:container, model: model});
						fisTipView.render();
					}};

					cbio.util.addTargetedQTip(this, qTipOptsOma);
				});
			},
			"cBioPortal": function(selector, helper) {
				var gene = helper.gene;
				var mutationUtil = helper.mutationUtil;
				var portalProxy = helper.dataProxies.portalProxy;
				var mutationTable = helper.table;

				var addTooltip = function (frequencies, cancerStudyMetaData, cancerStudyName)
				{
					$(selector).find('.mutation_table_cbio_portal').each(function(idx, ele) {
						var mutationId = $(this).closest("tr.mutation-table-data-row").attr("id");
						var mutation = mutationUtil.getMutationIdMap()[mutationId];
						var cancerStudy = cancerStudyName || mutation.get("cancerStudy");

						cbio.util.addTargetedQTip(ele, {
							content: {text: 'pancancer mutation bar chart is broken'},
							events: {
								render: function(event, api) {
									var model = {pancanMutationFreq: frequencies,
										cancerStudyMetaData: cancerStudyMetaData,
										cancerStudyName: cancerStudy,
										geneSymbol: gene,
										keyword: mutation.get("keyword"),
										proteinPosStart: mutation.get("proteinPosStart"),
										mutationType: mutation.get("mutationType"),
										qtipApi: api};

									//var container = $(this).find('.qtip-content');
									var container = $(this);

									// create & render the view
									var pancanTipView = new PancanMutationHistTipView({el:container, model: model});
									pancanTipView.render();
								}
							},
							hide: {fixed: true, delay: 100 },
							style: {classes: 'qtip-light qtip-rounded qtip-shadow', tip: true},
							position: {my:'center right',at:'center left',viewport: $(window)}
						});
					});
				};

				if (mutationTable.getCustomData()["cBioPortal"] != null)
				{
					// TODO always get the cancerStudyName from the mutation data?
					portalProxy.getPortalData(
						{cancerStudyMetaData: true, cancerStudyName: true}, function(portalData) {
							addTooltip(mutationTable.getCustomData()["cBioPortal"],
							           portalData.cancerStudyMetaData,
							           portalData.cancerStudyName);
					});
				}
			}
		},
		// default event listener config
		// TODO add more params if necessary
		eventListeners: {
			"windowResize": function(dataTable, dispatcher, mutationUtil, gene) {
				// add resize listener to the window to adjust column sizing
				$(window).one('resize', function () {
					if (dataTable.is(":visible"))
					{
						dataTable.fnAdjustColumnSizing();
					}
				});
			},
			"igvLink": function(dataTable, dispatcher, mutationUtil, gene) {
				// add click listener for each igv link to get the actual parameters
				// from another servlet
				$(dataTable).find('.igv-link').off("click").on("click", function(evt) {
					evt.preventDefault();

					var mutationId = $(this).closest("tr.mutation-table-data-row").attr("id");
					var mutation = mutationUtil.getMutationIdMap()[mutationId];
					var url = mutation.get("igvLink");

					// get parameters from the server and call related igv function
					$.getJSON(url, function(data) {
						prepIGVLaunch(data.bamFileUrl,
						              data.encodedLocus,
						              data.referenceGenome,
						              data.trackName);
					});
				});
			},
			"proteinChange3d": function(dataTable, dispatcher, mutationUtil, gene) {
				// add click listener for each 3D link
				$(dataTable).find('.mutation-table-3d-link').off("click").on("click", function(evt) {
					evt.preventDefault();

					var mutationId = $(this).closest("tr.mutation-table-data-row").attr("id");

					dispatcher.trigger(
						MutationDetailsEvents.PDB_LINK_CLICKED,
						mutationId);
				});
			},
			"proteinChange": function(dataTable, dispatcher, mutationUtil, gene) {
				// add click listener for each protein change link
				$(dataTable).find('.mutation-table-protein-change a').off("click").on("click", function(evt) {
					evt.preventDefault();

					var mutationId = $(this).closest("tr.mutation-table-data-row").attr("id");

					dispatcher.trigger(
						MutationDetailsEvents.PROTEIN_CHANGE_LINK_CLICKED,
						mutationId);
				});
			}
		},
		// column sort functions:
		// returns the value to be used for column sorting purposes.
		// if no sort function is defined for a column,
		// then uses the render function for sorting purposes.
		columnSort: {
			"mutationId": function(datum) {
				var mutation = datum.mutation;
				if (mutation.get("mutationId") === undefined) {
					return "";
				}
				return mutation.get("mutationId");
			},
			"mutationSid": function(datum) {
				var mutation = datum.mutation;
				if (mutation.get("mutationSid") === undefined) {
					return "";
				}
				return mutation.get("mutationSid");
			},
			"caseId": function(datum) {
				var mutation = datum.mutation;
				if (mutation.get("caseId") === undefined) {
					return "";
				}
				return mutation.get("caseId");
			},
			"proteinChange": function(datum) {
				var proteinChange = datum.mutation.get("proteinChange");
				//var matched = proteinChange.match(/.*[A-Z]([0-9]+)[^0-9]+/);
				var alleleAndPosition = /[A-Za-z][0-9]+./g;
				var position = /[0-9]+/g;
				var nonNumerical = /[^0-9]+/g;

				var extractNonNumerical = function(matched) {
					// this is to sort alphabetically
					// in case the protein position values are the same
					var buffer = matched[0].match(nonNumerical);

					if (buffer && buffer.length > 0)
					{
						var str = buffer.join("");
						buffer = [];

						// since we are returning a float value
						// assigning numerical value for each character.
						// we have at most 2 characters, so this should be safe...
						for (var i=0; i<str.length; i++)
						{
							buffer.push(str.charCodeAt(i));
						}
					}

					return buffer;
				};

				// first priority is to match values like V600E , V600, E747G, E747, X37_, X37, etc.
				var matched = proteinChange.match(alleleAndPosition);
				var buffer = [];

				// if no match, then search for numerical (position) match only
				if (!matched || matched.length === 0)
				{
					matched = proteinChange.match(position);
				}
				// if match, then extract the first numerical value for sorting purposes
				else
				{
					// this is to sort alphabetically
					buffer = extractNonNumerical(matched);
					matched = matched[0].match(position);
				}

				// if match, then use the first integer value as sorting data
				if (matched && matched.length > 0)
				{
					var toParse =  matched[0];

					// this is to sort alphabetically
					if (buffer && buffer.length > 0)
					{
						// add the alphabetical information as the decimal part...
						// (not the best way to ensure alphabetical sorting,
						// but in this method we are only allowed to return a numerical value)
						toParse += "." + buffer.join("");
					}

					return parseFloat(toParse);
				}
				else
				{
					// no match at all: do not sort
					return -Infinity;
				}
			},
			"cancerStudy": function(datum) {
				var mutation = datum.mutation;
				var value = mutation.get("cancerStudy");
				if (value === undefined) {
					return "";
				}
				return value;
			},
			"tumorType": function(datum) {
				var mutation = datum.mutation;
				var value = mutation.get("tumorType");
				if (value === undefined) {
					return "";
				}
				return value;
			},
			"mutationType": function(datum) {
				var mutation = datum.mutation;
				var value = mutation.get("mutationType");
				if (value === undefined) {
					return "";
				}
				return value;
			},
			"cosmic": function(datum) {
				var mutation = datum.mutation;
				return MutationDetailsTableFormatter.assignIntValue(mutation.getCosmicCount());
			},
			"cna": function(datum) {
				var mutation = datum.mutation;
				return MutationDetailsTableFormatter.assignIntValue(mutation.get("cna"));
			},
			"mutationCount": function(datum) {
				var mutation = datum.mutation;
				return MutationDetailsTableFormatter.assignIntValue(mutation.get("mutationCount"));
			},
			"normalFreq": function(datum) {
				var mutation = datum.mutation;
				return MutationDetailsTableFormatter.assignFloatValue(mutation.get("normalFreq"));
			},
			"tumorFreq": function(datum) {
				var mutation = datum.mutation;
				return MutationDetailsTableFormatter.assignFloatValue(mutation.get("tumorFreq"));
			},
			"mutationAssessor": function(datum) {
				var mutation = datum.mutation;

				return MutationDetailsTableFormatter.assignValueToPredictedImpact(
					mutation.get("functionalImpactScore"),
					mutation.get("fisValue"));
			},
			"mutationStatus": function(datum) {
				var mutation = datum.mutation;
				var value = mutation.get("mutationStatus");
				if (value === undefined) {
					return "";
				}
				return value;
			},
			"validationStatus": function(datum) {
				var mutation = datum.mutation;
				var value = mutation.get("validationStatus");
				if (value === undefined) {
					return "";
				}
				return value;
			},
			"normalRefCount": function(datum) {
				var mutation = datum.mutation;
				return MutationDetailsTableFormatter.assignIntValue(mutation.get("normalRefCount"));
			},
			"normalAltCount": function(datum) {
				var mutation = datum.mutation;
				return MutationDetailsTableFormatter.assignIntValue(mutation.get("normalAltCount"));
			},
			"tumorRefCount": function(datum) {
				var mutation = datum.mutation;
				return MutationDetailsTableFormatter.assignIntValue(mutation.get("tumorRefCount"));
			},
			"tumorAltCount": function(datum) {
				var mutation = datum.mutation;
				return MutationDetailsTableFormatter.assignIntValue(mutation.get("tumorAltCount"));
			},
			"startPos": function(datum) {
				var mutation = datum.mutation;
				return MutationDetailsTableFormatter.assignIntValue(mutation.get("startPos"));
			},
			"endPos": function(datum) {
				var mutation = datum.mutation;
				return MutationDetailsTableFormatter.assignIntValue(mutation.get("endPos"));
			},
			"sequencingCenter": function(datum) {
				var mutation = datum.mutation;
				var value = mutation.get("sequencingCenter");
				if (value === undefined) {
					value = "";
				}
				return value;
			},
			"chr": function(datum) {
				var mutation = datum.mutation;
				var value = mutation.get("chr");
				if (value === undefined) {
					return "";
				}
				return value;
			},
			"referenceAllele": function(datum) {
				var mutation = datum.mutation;
				var value = mutation.get("referenceAllele");
				if (value === undefined) {
					return "";
				}
				return value;
			},
			"variantAllele": function(datum) {
				var mutation = datum.mutation;
				var value = mutation.get("variantAllele");
				if (value === undefined) {
					return "";
				}
				return value;
			},
			"igvLink": function(datum) {
				var mutation = datum.mutation;
				var value = mutation.get("igvLink");
				if (value === undefined) {
					return "";
				}
				return value;
			},
			"cBioPortal": function(datum) {
				var portal = datum.cBioPortal;

				// portal value may be null,
				// because we are retrieving it through another ajax call...
				return portal || 0;
			}
		},
		// column filter functions:
		// returns the value to be used for column sorting purposes.
		// if no filter function is defined for a column,
		// then uses the sort function value for filtering purposes.
		// if no sort function is defined either, then uses
		// the value returned by the render function.
		columnFilter: {
			"proteinChange": function(datum) {
				return datum.mutation.get("proteinChange") || "";
			},
			"mutationType": function(datum) {
				// use display value for mutation type, not the sort value
				var mutationType = MutationDetailsTableFormatter.getMutationType(
					datum.mutation.get("mutationType"));

				return mutationType.text;
			},
			"cosmic": function(datum) {
				return datum.mutation.getCosmicCount() || "";
			},
			"cna": function(datum) {
				return datum.mutation.get("cna") || "";
			},
			"mutationCount": function(datum) {
				return datum.mutation.get("mutationCount") || "";
			},
			"normalFreq": function(datum) {
				return datum.mutation.get("normalFreq") || "";
			},
			"tumorFreq": function(datum) {
				return datum.mutation.get("tumorFreq") || "";
			},
			"mutationAssessor": function(datum) {
				return datum.mutation.get("functionalImpactScore") || "";
			},
			"normalRefCount": function(datum) {
				return datum.mutation.get("normalRefCount") || "";
			},
			"normalAltCount": function(datum) {
				return datum.mutation.get("normalAltCount") || "";
			},
			"tumorRefCount": function(datum) {
				return datum.mutation.get("tumorRefCount") || "";
			},
			"tumorAltCount": function(datum) {
				return datum.mutation.get("tumorAltCount") || "";
			},
			"startPos": function(datum) {
				return datum.mutation.get("startPos") || "";
			},
			"endPos": function(datum) {
				return datum.mutation.get("endPos") || "";
			}
		},
		// native "mData" function for DataTables plugin. if this is implemented,
		// functions defined in columnRender and columnSort will be ignored.
		// in addition to default source, type, and val parameters,
		// another parameter "indexMap" will also be passed to the function.
		columnData: {
			// not implemented by default:
			// default config relies on columnRender,
			// columnSort, and columnFilter functions
		},
		// delay amount before applying the user entered filter query
		filteringDelay: 600,
		// WARNING: overwriting advanced DataTables options such as
		// aoColumnDefs, oColVis, and fnDrawCallback may break column
		// visibility, sorting, and filtering. Proceed wisely ;)
		dataTableOpts: {
			"sDom": '<"H"<"mutation_datatables_filter"f>C<"mutation_datatables_info"i>>t<"F"<"mutation_datatables_download"T>>',
			"bJQueryUI": true,
			"bPaginate": false,
			//"sPaginationType": "two_button",
			"bFilter": true,
			"sScrollY": "600px",
			"bScrollCollapse": true,
			"oLanguage": {
				"sInfo": "Showing _TOTAL_ mutation(s)",
				"sInfoFiltered": "(out of _MAX_ total mutations)",
				"sInfoEmpty": "No mutations to show"
			}
		}
	};

	// merge options with default options to use defaults for missing values
	var _options = jQuery.extend(true, {}, _defaultOpts, options);

	// call super constructor to init options and other params
	AdvancedDataTable.call(this, _options);
	_options = self._options;

	// custom event dispatcher
	var _dispatcher = self._dispatcher;

	// flag used to switch filter event on/off
	var _filterEventActive = true;

	// this is used to check if search string is changed after each redraw
	var _prevSearch = "";

	// last search string manually entered by the user
	var _manualSearch = "";

	var _rowMap = {};

	var _selectedRow = null;

	// optional table specific data
	var _customData = {};

	/**
	 * Generates the data table options for the given parameters.
	 *
	 * @param tableSelector jQuery selector for the target table
	 * @param rows          data rows
	 * @param columnOpts    column options
	 * @param nameMap       map of <column display name, column name>
	 * @param indexMap      map of <column name, column index>
	 * @param hiddenCols    indices of the hidden columns
	 * @param excludedCols  indices of the excluded columns
	 * @param nonSearchableCols    indices of the columns excluded from search
	 * @return {object}     DataTable options
	 * @private
	 */
	function initDataTableOpts(tableSelector, rows, columnOpts, nameMap,
		indexMap, hiddenCols, excludedCols, nonSearchableCols)
	{
		// generate column options for the data table
		var columns = DataTableUtil.getColumnOptions(columnOpts,
			indexMap);

		// these are the parametric data tables options
		var tableOpts = {
			"aaData" : rows,
			"aoColumns" : columns,
			"aoColumnDefs":[
				{"bVisible": false,
					"aTargets": hiddenCols},
				{"bSearchable": false,
					"aTargets": nonSearchableCols}
			],
			"oColVis": {"aiExclude": excludedCols}, // columns to always hide
			"oTableTools": {
				"aButtons": [{
					"sExtends": "text",
					"sButtonText": "Download",
					"mColumns": getExportColumns(columnOpts, excludedCols),
					"fnCellRender": function(sValue, iColumn, nTr, iDataIndex) {
						var value = sValue;

						// strip HTML content and use the main (visible) text only
						if(sValue.indexOf("<") != -1 &&
						   sValue.indexOf(">") != -1)
						{
							value = $(sValue).text();
						}

						// also remove the text of "3D" link from the protein change column
						if (iColumn === indexMap["proteinChange"])
						{
							value = value.replace(/(\s)3D/, '');
						}

						return value.trim();
					},
					"fnClick": function(nButton, oConfig) {
						// get the file data (formatted by 'fnCellRender' function)
						var content = this.fnGetTableData(oConfig);

						var downloadOpts = {
							filename: "mutation_table_" + gene + ".tsv",
							contentType: "text/plain;charset=utf-8",
							preProcess: false};

						// send download request with filename & file content info
						cbio.download.initDownload(content, downloadOpts);
					}
				}]
			},
			"fnDrawCallback": function(oSettings) {
				self._addColumnTooltips({gene: gene,
					mutationUtil: mutationUtil,
					dataProxies: dataProxies,
					table: self});
				self._addEventListeners(indexMap);

				var currSearch = oSettings.oPreviousSearch.sSearch;

				// trigger the event only if the corresponding flag is set
				// and there is a change in the search term
				if (_filterEventActive &&
				    _prevSearch != currSearch)
				{
					// trigger corresponding event
					_dispatcher.trigger(
						MutationDetailsEvents.MUTATION_TABLE_FILTERED,
						tableSelector);

					// assuming events are active for only manual filtering
					// so update manual search string only after triggering the event
					_manualSearch = currSearch;
				}

				// update prev search string reference for future use
				_prevSearch = currSearch;

				// trigger redraw event
				_dispatcher.trigger(
					MutationDetailsEvents.MUTATION_TABLE_REDRAWN,
					tableSelector);

				// TODO this may not be safe: prevent rendering of invalid links in the corresponding render function
				// remove invalid links
				$(tableSelector).find('a[href=""]').remove();

				// remove invalid protein change tips
				$(tableSelector).find('span.mutation-table-additional-protein-change[alt=""]').remove();
			},
			"fnRowCallback": function(nRow, aData, iDisplayIndex, iDisplayIndexFull ) {
				var mutation = aData[indexMap["datum"]].mutation;
				// TODO mapping on mutationId and mutationSid...
				//var key = mutation.mutationId;
				//_rowMap[key] = nRow;
				$(nRow).attr("id", mutation.get("mutationId"));
				$(nRow).addClass(mutation.get("mutationSid"));
				$(nRow).addClass("mutation-table-data-row");
			},
			//"fnCreatedRow": function(nRow, aData, iDataIndex) {
			//
			//},
			"fnInitComplete": function(oSettings, json) {
				//$(tableSelector).find('a[href=""]').remove();
				//$(tableSelector).find('a[alt=""]').remove();
				//$(tableSelector).find('a.igv-link[alt=""]').remove();

				// TODO append the footer
				// (there is no API to init the footer, we need a custom function)
				//$(tableSelector).append('<tfoot></tfoot>');
				//$(tableSelector).find('thead tr').clone().appendTo($(tableSelector).find('tfoot'));

				// set the data table instance as soon as the table is initialized
				self.setDataTable(this);

				// trigger corresponding event
				_dispatcher.trigger(
					MutationDetailsEvents.MUTATION_TABLE_INITIALIZED,
					tableSelector);
			},
			"fnHeaderCallback": function(nHead, aData, iStart, iEnd, aiDisplay) {
			    $(nHead).find('th').addClass("mutation-details-table-header");
				self._addHeaderTooltips(nHead, nameMap);

				//Trigger fnHeader callback function
				_dispatcher.trigger(
					MutationDetailsEvents.MUTATION_TABLE_HEADER_CREATED,
					tableSelector);
		    }
//		    "fnFooterCallback": function(nFoot, aData, iStart, iEnd, aiDisplay) {
//			    addFooterTooltips(nFoot, nameMap);
//		    }
		};

		return tableOpts;
	}

	/**
	 * Creates an array of indices for the columns to be exported for download.
	 *
	 * @param columnOpts    basic column options
	 * @param excludedCols  indices of the excluded columns
	 * @returns {Array}     an array of column indices
	 */
	function getExportColumns(columnOpts, excludedCols)
	{
		var exportCols = [];

		for (var i = 0; i <= _.keys(columnOpts).length; i++) {
			exportCols.push(i);
		}

		return _.difference(exportCols, excludedCols);
	}

	/**
	 * Determines the visibility value for the given column name
	 *
	 * @param columnName    name of the column (header)
	 * @return {String}     visibility value for the given column
	 */
	function visibilityValue(columnName)
	{
		var vis = _options.columnVisibility[columnName];
		var value = vis;

		// if not in the list, hidden by default
		if (!vis)
		{
			value = "hidden";
		}
		// if function, then evaluate the value
		else if (_.isFunction(vis))
		{
			value = vis(mutationUtil, gene);
		}

		return value;
	}

	/**
	 * Determines the search value for the given column name
	 *
	 * @param columnName    name of the column (header)
	 * @return {Boolean}    whether searchable or not
	 */
	function searchValue(columnName)
	{
		var searchVal = _options.columnSearch[columnName];
		var value = searchVal;

		// if not in the list, hidden by default
		if (searchVal == null)
		{
			value = false;
		}
		// if function, then evaluate the value
		else if (_.isFunction(searchVal))
		{
			// TODO determine function params (if needed)
			value = searchVal();
		}

		return value;
	}

	/**
	 * Adds default event listeners for the table.
	 *
	 * @param indexMap  column index map
	 */
	function addEventListeners(indexMap)
	{
		// add listeners only if the data table is initialized
		if (self.getDataTable() != null)
		{
			_.each(_options.eventListeners, function(listenerFn) {
				listenerFn(self.getDataTable(), _dispatcher, mutationUtil, gene);
			});
		}
	}

	function selectRow(mutationId)
	{
		// remove previous highlights
		removeAllSelection();

		// highlight selected
		var nRow = _rowMap[mutationId];
		$(nRow).addClass("row_selected");

		_selectedRow = nRow;
	}

	function removeAllSelection()
	{
		$(_options.el).find("tr").removeClass("row_selected");
	}

	function getSelectedRow()
	{
		return _selectedRow;
	}

	/**
	 * Enables/disables event triggering.
	 *
	 * @param active    boolean value
	 */
	function setFilterEventActive(active)
	{
		_filterEventActive = active;
	}

	/**
	 * Resets filtering related variables to their initial state.
	 * Does not remove actual table filters.
	 */
	function cleanFilters()
	{
		_prevSearch = "";
		_manualSearch = "";
	}

	function getManualSearch()
	{
		return _manualSearch;
	}

	/**
	 * Adds tooltips for the table header cells.
	 *
	 * @param nHead     table header
	 * @param nameMap   map of <column display name, column name>
	 * @private
	 */
	function addHeaderTooltips(nHead, nameMap)
	{
		var qTipOptions = MutationViewsUtil.defaultTableTooltipOpts();

		var qTipOptionsHeader = {};
		jQuery.extend(true, qTipOptionsHeader, qTipOptions);
		qTipOptionsHeader.position = {my:'bottom center', at:'top center', viewport: $(window)};

		//tableSelector.find('thead th').qtip(qTipOptionsHeader);
		$(nHead).find("th").each(function(){
			var displayName = $(this).text();
			var colName = nameMap[displayName];

			if (colName != null)
			{
				var tip = _options.columns[colName].tip;
				var opts = {};

				// merge qTip options with the provided options object
				if(_.isObject(tip))
				{
					jQuery.extend(true, opts, qTipOptionsHeader, tip);
				}
				// if not an object, then assuming it is a string,
				// just update the content
				else
				{
					//$(this).attr("alt", tip);
					qTipOptionsHeader.content = tip;
					opts = qTipOptionsHeader;
				}

				//$(this).qtip(opts);
				cbio.util.addTargetedQTip(this, opts);
			}
		});
	}

	/**
	 * Adds tooltips for the table footer cells.
	 *
	 * @param nFoot table footer
	 * @private
	 */
	function addFooterTooltips(nFoot)
	{
		var qTipOptions = MutationViewsUtil.defaultTableTooltipOpts();

		var qTipOptionsFooter = {};
		jQuery.extend(true, qTipOptionsFooter, qTipOptions);
		qTipOptionsFooter.position = {my:'top center', at:'bottom center', viewport: $(window)};

		cbio.util.addTargetedQTip($(nFoot).find("th"), qTipOptionsFooter);
	}

	// class instance to keep track of previous requests
	var _requestHistory = {};

	/**
	 * Requests column data from the data manager for the given data field name,
	 * and updates the corresponding column.
	 *
	 * @param dataFnName    data function name for data manager request
	 * @param columnName    name of the column to be updated/rendered
	 * @param callback      [optional] callback to be invoked after data retrieval
	 */
	function requestColumnData(dataFnName, columnName, callback)
	{
		columnName = columnName || dataFnName;

		// do not request data at all for excluded columns, and
		// only request once for the same dataFnName and columnName combination
		if (self._visiblityMap[columnName] === "excluded" ||
			_requestHistory[dataFnName + ":" + columnName])
		{
			return;
		}
		else
		{
			_requestHistory[dataFnName + ":" + columnName] = true;
		}

		callback = callback || function(params, data) {
			var mutationTable = params.mutationTable;

			// TODO is this the right place to store the custom table data?
			if (data)
			{
				self.getCustomData()[dataFnName] = data;
			}

			MutationViewsUtil.refreshTableColumn(
				mutationTable.getDataTable(),
				mutationTable.getIndexMap(),
				columnName);
		};

		function getColumnData()
		{
			_dispatcher.off(
				MutationDetailsEvents.MUTATION_TABLE_INITIALIZED,
				getColumnData);

			// get the pdb data for the entire table
			dataManager.getData(dataFnName,
				{mutationTable: self},
				// TODO instead of a callback,
				// listen to the data change/update events, and update the corresponding column?
			    callback
			);
		}

		// if table is not initialized yet, wait for the init event
		if (self.getDataTable() == null)
		{
			_dispatcher.on(
				MutationDetailsEvents.MUTATION_TABLE_INITIALIZED,
				getColumnData);
		}
		else
		{
			getColumnData();
		}
	}

	function getMutations()
	{
		var mutations = null;

		if (mutationUtil)
		{
			mutations = mutationUtil.getMutations();
		}

		return mutations;
	}

	function getCustomData()
	{
		return _customData;
	}

	function getMutationUtil()
	{
		return mutationUtil;
	}

	function getGene()
	{
		return gene;
	}

	// override required functions
	this._initDataTableOpts = initDataTableOpts;
	this._visibilityValue = visibilityValue;
	this._searchValue = searchValue;
	this._addEventListeners = addEventListeners;
	this._addHeaderTooltips = addHeaderTooltips;

	// additional public functions
	this.setFilterEventActive = setFilterEventActive;
	this.getManualSearch = getManualSearch;
	this.cleanFilters = cleanFilters;
	this.requestColumnData = requestColumnData;
	this.getCustomData = getCustomData;
	this.getMutations = getMutations;
	this.getMutationUtil = getMutationUtil;
	this.getGene = getGene;

	//this.selectRow = selectRow;
	//this.getSelectedRow = getSelectedRow;
	this.dispatcher = this._dispatcher;
}

// MutationDetailsTable extends AdvancedDataTable...
MutationDetailsTable.prototype = new AdvancedDataTable();
MutationDetailsTable.prototype.constructor = MutationDetailsTable;

