(function() {
window["backbone-template"] = window["backbone-template"] || {};

window["backbone-template"]["mutationViews"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<script type="text/template" id="mutation_3d_view_template">\n    <button class=\'mutation-3d-vis btn btn-default\'>\n        3D Structure &#187;\n\t</button>\n</script>\n\n<script type="text/template" id="mutation_3d_vis_info_template">\n\t<div class=\'mutation-3d-info-title\'>\n\t\t3D Structure\n\t</div>\n\t<div class=\'mutation-3d-info-main\'>\n\t\tPDB\n\t\t<span class=\'mutation-3d-pdb-id\'>\n\t\t\t<a href="http://www.rcsb.org/pdb/explore/explore.do?structureId={{pdbId}}"\n\t\t\t   target="_blank">\n\t\t\t\t{{pdbId}}\n\t\t\t</a>\n\t\t</span>\n\t\t<span class=\'mutation-3d-pdb-info\'>: {{pdbInfo}}</span><br>\n\t\tChain\n\t\t<span class=\'mutation-3d-chain-id\'>{{chainId}}</span>\n\t\t<span class=\'mutation-3d-mol-info\'>: {{molInfo}}</span>\n\t</div>\n</script>\n\n<script type="text/template" id="mutation_3d_vis_template">\n\t<div class=\'mutation-3d-vis-header\'>\n\t\t<span class=\'mutation-3d-close ui-icon ui-icon-circle-close\' title=\'close\'></span>\n\t\t<span class=\'mutation-3d-minimize ui-icon ui-icon-circle-minus\' title=\'minimize\'></span>\n\t\t<div class=\'mutation-3d-info\'></div>\n\t</div>\n\t<div class=\'mutation-3d-residue-warning\'>\n\t\t<span class="mutation-3d-unmapped-info">Selected mutation</span>\n\t\tcannot be mapped onto this structure.\n\t</div>\n\t<div class=\'mutation-3d-nomap-warning\'>\n\t\tNone of the mutations can be mapped onto this structure.\n\t</div>\n\t<div class=\'mutation-3d-vis-loader\'>\n\t\t<img src=\'{{loaderImage}}\'/>\n\t</div>\n\t<div class=\'mutation-3d-vis-container\'></div>\n\t<div class=\'mutation-3d-vis-toolbar\'>\n\t\t<div class=\'mutation-3d-vis-help-init\'>\n\t\t\t<table>\n\t\t\t\t<tr>\n\t\t\t\t\t<td align="left">\n\t\t\t\t\t\t<button class=\'mutation-3d-pymol-dload\'>PyMOL</button>\n\t\t\t\t\t</td>\n\t\t\t\t\t<td align="right">\n\t\t\t\t\t\t<a class=\'mutation-3d-vis-help-open\' href="#">how to pan/zoom/rotate?</a>\n\t\t\t\t\t</td>\n\t\t\t\t</tr>\n\t\t\t</table>\n\t\t</div>\n\t\t<div class=\'mutation-3d-vis-help-content\'>\n\t\t\t<div class="mutation-3d-vis-help-close">\n\t\t\t\t<a href="#"><b>&times;</b></a>\n\t\t\t</div>\n\t\t\t<h4>3D visualizer basic interaction</h4>\n\t\t\t<b>Zoom in/out:</b> Press and hold the SHIFT key and the left mouse button,\n\t\t\tand then move the mouse backward/forward.<br>\n\t\t\t<b>Pan:</b> Press and hold the SHIFT key, double click and hold the left mouse button,\n\t\t\tand then move the mouse in the desired direction.<br>\n\t\t\t<b>Rotate:</b> Press and hold the left mouse button, and then move the mouse in the desired\n\t\t\tdirection to rotate along the x and y axes. To be able to rotate along the z-axis, you need to\n\t\t\tpress and hold the SHIFT key and the left mouse button, and then move the mouse left or right.<br>\n\t\t\t<b>Reset:</b> Press and hold the SHIFT key, and then double click on the background\n\t\t\tto reset the orientation and the zoom level to the initial state.\n\t\t</div>\n\t\t<table>\n\t\t\t<tr>\n\t\t\t\t<!--td>\n\t\t\t\t\t<input class=\'mutation-3d-spin\' type=\'checkbox\'>\n\t\t\t\t\t<label>Spin</label>\n\t\t\t\t</td>\n\t\t\t\t<td class=\'mutation-3d-buttons\'>\n\t\t\t\t\t<button class=\'mutation-3d-button mutation-3d-center-selected\'\n\t\t\t\t\t\t\talt=\'Center the view on the highlighted residue\'></button>\n\t\t\t\t\t<button class=\'mutation-3d-button mutation-3d-center-default\'\n\t\t\t\t\t\t\talt=\'Restore the view to its default center\'></button>\n\t\t\t\t</td>\n\t\t\t\t<td class=\'mutation-3d-zoom-label\'>\n\t\t\t\t\t<label>Zoom</label>\n\t\t\t\t</td>\n\t\t\t\t<td>\n\t\t\t\t\t<div class=\'mutation-3d-zoom-slider\'></div>\n\t\t\t\t</td-->\n\t\t\t</tr>\n\t\t</table>\n\t\t<table class="mutation-3d-controls-menu" cellpadding="0">\n\t\t\t<tr>\n\t\t\t\t<td class=\'mutation-3d-protein-style-menu\' valign=\'top\'>\n\t\t\t\t\t<div class=\'mutation-3d-style-header\'>\n\t\t\t\t\t\t<label>Protein Style</label>\n\t\t\t\t\t</div>\n\t\t\t\t\t<table cellpadding=\'0\'>\n\t\t\t\t\t\t<tr>\n\t\t\t\t\t\t\t<td>\n\t\t\t\t\t\t\t\t<label>\n\t\t\t\t\t\t\t\t\t<input class=\'mutation-3d-display-non-protein\'\n\t\t\t\t\t\t\t\t\t       type=\'checkbox\'\n\t\t\t\t\t\t\t\t\t       checked=\'checked\'>\n\t\t\t\t\t\t\t\t\tDisplay bound molecules\n\t\t\t\t\t\t\t\t</label>\n\t\t\t\t\t\t\t\t<img class=\'display-non-protein-help\' src=\'{{helpImage}}\'/>\n\t\t\t\t\t\t\t</td>\n\t\t\t\t\t\t</tr>\n\t\t\t\t\t\t<tr>\n\t\t\t\t\t\t\t<td>\n\t\t\t\t\t\t\t\t<label>Scheme:</label>\n\t\t\t\t\t\t\t\t<select class=\'mutation-3d-protein-style-select\'>\n\t\t\t\t\t\t\t\t\t<option value=\'cartoon\'\n\t\t\t\t\t\t\t\t\t        title=\'Switch to the Cartoon Scheme\'>cartoon</option>\n\t\t\t\t\t\t\t\t\t<option value=\'spaceFilling\'\n\t\t\t\t\t\t\t\t\t        title=\'Switch to the Space-filling Scheme\'>space-filling</option>\n\t\t\t\t\t\t\t\t\t<option value=\'trace\'\n\t\t\t\t\t\t\t\t\t        title=\'Switch to the Trace Scheme\'>trace</option>\n\t\t\t\t\t\t\t\t</select>\n\t\t\t\t\t\t\t</td>\n\t\t\t\t\t\t</tr>\n\t\t\t\t\t\t<tr>\n\t\t\t\t\t\t\t<td>\n\t\t\t\t\t\t\t\t<label>Color:</label>\n\t\t\t\t\t\t\t\t<select class=\'mutation-3d-protein-color-select\'>\n\t\t\t\t\t\t\t\t\t<option value=\'uniform\'\n\t\t\t\t\t\t\t\t\t        title=\'Uniform Color\'>uniform</option>\n\t\t\t\t\t\t\t\t\t<option value=\'bySecondaryStructure\'\n\t\t\t\t\t\t\t\t\t        title=\'Color by Secondary Structure\'>secondary structure</option>\n\t\t\t\t\t\t\t\t\t<option value=\'byChain\'\n\t\t\t\t\t\t\t\t\t        title=\'Color by Rainbow Gradient\'>N-C rainbow</option>\n\t\t\t\t\t\t\t\t\t<option value=\'byAtomType\'\n\t\t\t\t\t\t\t\t\t        title=\'Color by Atom Type\'\n\t\t\t\t\t\t\t\t\t        disabled=\'disabled\'>atom type</option>\n\t\t\t\t\t\t\t\t</select>\n\t\t\t\t\t\t\t\t<img class=\'protein-struct-color-help\' src=\'{{helpImage}}\'/>\n\t\t\t\t\t\t\t</td>\n\t\t\t\t\t\t</tr>\n\t\t\t\t\t</table>\n\t\t\t\t</td>\n\t\t\t\t<td class=\'mutation-3d-mutation-style-menu\' valign=\'top\'>\n\t\t\t\t\t<div class=\'mutation-3d-style-header\'>\n\t\t\t\t\t\t<label>Mutation Style</label>\n\t\t\t\t\t</div>\n\t\t\t\t\t<table cellpadding="0">\n\t\t\t\t\t\t<tr>\n\t\t\t\t\t\t\t<td>\n\t\t\t\t\t\t\t\t<!--label>\n\t\t\t\t\t\t\t\t\t<input class=\'mutation-3d-side-chain\'\n\t\t\t\t\t\t\t\t\t       type=\'checkbox\'\n\t\t\t\t\t\t\t\t\t       checked=\'checked\'>\n\t\t\t\t\t\t\t\t\tDisplay side chain\n\t\t\t\t\t\t\t\t</label-->\n\t\t\t\t\t\t\t\t<label>Side chain:</label>\n\t\t\t\t\t\t\t\t<select class=\'mutation-3d-side-chain-select\'>\n\t\t\t\t\t\t\t\t\t<option value=\'all\'\n\t\t\t\t\t\t\t\t\t        title=\'Display side chain for all mapped residues\'>all</option>\n\t\t\t\t\t\t\t\t\t<option value=\'highlighted\'\n\t\t\t\t\t\t\t\t\t        selected=\'selected\'\n\t\t\t\t\t\t\t\t\t        title=\'Display side chain for highlighted residues only\'>selected</option>\n\t\t\t\t\t\t\t\t\t<option value=\'none\'\n\t\t\t\t\t\t\t\t\t        title=\'Do not display side chains\'>none</option>\n\t\t\t\t\t\t\t\t</select>\n\t\t\t\t\t\t\t\t<img class=\'display-side-chain-help\' src=\'{{helpImage}}\'/>\n\t\t\t\t\t\t\t</td>\n\t\t\t\t\t\t</tr>\n\t\t\t\t\t\t<tr>\n\t\t\t\t\t\t\t<td>\n\t\t\t\t\t\t\t\t<!--table cellpadding="0">\n\t\t\t\t\t\t\t\t\t<tr>\n\t\t\t\t\t\t\t\t\t\t<td>\n\t\t\t\t\t\t\t\t\t\t\t<label>Color:</label>\n\t\t\t\t\t\t\t\t\t\t</td>\n\t\t\t\t\t\t\t\t\t\t<td>\n\t\t\t\t\t\t\t\t\t\t\t<label>\n\t\t\t\t\t\t\t\t\t\t\t\t<input class=\'mutation-3d-mutation-color-by-type\'\n\t\t\t\t\t\t\t\t\t\t\t\t       type=\'checkbox\'\n\t\t\t\t\t\t\t\t\t\t\t\t       checked=\'checked\'>\n\t\t\t\t\t\t\t\t\t\t\t\tmutation type\n\t\t\t\t\t\t\t\t\t\t\t</label>\n\t\t\t\t\t\t\t\t\t\t\t<img class=\'mutation-type-color-help\' src=\'{{helpImage}}\'/>\n\t\t\t\t\t\t\t\t\t\t</td>\n\t\t\t\t\t\t\t\t\t</tr>\n\t\t\t\t\t\t\t\t\t<tr>\n\t\t\t\t\t\t\t\t\t\t<td></td>\n\t\t\t\t\t\t\t\t\t\t<td>\n\t\t\t\t\t\t\t\t\t\t\t<label>\n\t\t\t\t\t\t\t\t\t\t\t\t<input class=\'mutation-3d-mutation-color-by-atom\'\n\t\t\t\t\t\t\t\t\t\t\t\t       type=\'checkbox\'>\n\t\t\t\t\t\t\t\t\t\t\t\tatom type\n\t\t\t\t\t\t\t\t\t\t\t</label>\n\t\t\t\t\t\t\t\t\t\t</td>\n\t\t\t\t\t\t\t\t\t</tr>\n\t\t\t\t\t\t\t\t</table-->\n\t\t\t\t\t\t\t\t<label>Color:</label>\n\t\t\t\t\t\t\t\t<select class=\'mutation-3d-mutation-color-select\'>\n\t\t\t\t\t\t\t\t\t<option value=\'uniform\'\n\t\t\t\t\t\t\t\t\t        title=\'Uniform color\'>uniform</option>\n\t\t\t\t\t\t\t\t\t<option value=\'byMutationType\'\n\t\t\t\t\t\t\t\t\t        selected=\'selected\'\n\t\t\t\t\t\t\t\t\t        title=\'Color by mutation type\'>mutation type</option>\n\t\t\t\t\t\t\t\t\t<option value=\'none\'\n\t\t\t\t\t\t\t\t\t        title=\'Do not color\'>none</option>\n\t\t\t\t\t\t\t\t</select>\n\t\t\t\t\t\t\t\t<img class=\'mutation-type-color-help\' src=\'{{helpImage}}\'/>\n\t\t\t\t\t\t\t</td>\n\t\t\t\t\t\t</tr>\n\t\t\t\t\t</table>\n\t\t\t\t</td>\n\t\t\t</tr>\n\t\t</table>\n\t</div>\n</script>\n\n<script type="text/template" id="mutation_3d_type_color_tip_template">\n\tColor options for the mapped mutations.<br>\n\t<br>\n\t<b>Uniform:</b> Colors all mutated residues with a\n\t<span class=\'uniform_mutation\'>single color</span>.<br>\n\t<b>Mutation type:</b> Enables residue coloring by mutation type.\n\tMutation types and corresponding color codes are as follows:\n\t<ul>\n\t\t<li><span class=\'missense_mutation\'>Missense Mutations</span></li>\n\t\t<li><span class=\'trunc_mutation\'>Truncating Mutations</span>\n\t\t\t(Nonsense, Nonstop, FS del, FS ins)</li>\n\t\t<li><span class=\'inframe_mutation\'>Inframe Mutations</span>\n\t\t\t(IF del, IF ins)</li>\n\t\t<li>\n\t\t\tResidues colored with <span class=\'mutation-3d-tied\'>purple</span> indicate residues\n\t\t\tthat are affected by different mutation types at the same proportion.\n\t\t</li>\n\t</ul>\n\t<b>None:</b> Disables coloring of the mutated residues\n\texcept for manually selected (highlighted) residues.<br>\n\t<br>\n\tHighlighted residues are colored with <span class=\'mutation-3d-highlighted\'>yellow</span>.\n</script>\n\n<script type="text/template" id="mutation_3d_structure_color_tip_template">\n\tColor options for the protein structure.<br>\n\t<br>\n\t<b>Uniform:</b> Colors the entire protein structure with a\n\t<span class=\'mutation-3d-loop\'>single color</span>.<br>\n\t<b>Secondary structure:</b> Colors the protein by secondary structure.\n\tAssigns different colors for <span class=\'mutation-3d-alpha-helix\'>alpha helices</span>,\n\t<span class=\'mutation-3d-beta-sheet\'>beta sheets</span>, and\n\t<span class=\'mutation-3d-loop\'>loops</span>.\n\tThis color option is not available for the space-filling protein scheme.<br>\n\t<b>N-C rainbow:</b> Colors the protein with a rainbow gradient\n\tfrom red (N-terminus) to blue (C-terminus).<br>\n\t<b>Atom Type:</b> Colors the structure with respect to the atom type (CPK color scheme).\n\tThis color option is only available for the space-filling protein scheme.<br>\n\t<br>\n\tThe selected chain is always displayed with full opacity while the rest of the structure\n\thas some transparency to help better focusing on the selected chain.\n</script>\n\n<script type="text/template" id="mutation_3d_side_chain_tip_template">\n\tDisplay options for the side chain atoms.<br>\n\t<br>\n\t<b>All:</b> Displays the side chain atoms for every mapped residue.<br>\n\t<b>Selected:</b> Displays the side chain atoms only for the selected mutations.<br>\n\t<b>None:</b> Hides the side chain atoms.<br>\n\t<br>\n\tThis option has no effect for the space-filling protein scheme.\n</script>\n\n<script type="text/template" id="mutation_3d_non_protein_tip_template">\n\tDisplays co-crystalized molecules.\n\tThis option has no effect if the current structure\n\tdoes not contain any co-crystalized bound molecules.\n</script>\n<script type="text/template" id="mutation_details_table_template">\n\t<table class=\'display mutation_details_table\'\n\t       cellpadding=\'0\' cellspacing=\'0\' border=\'0\'>\n\t</table>\n</script>\n\n<!-- Mutation Table components\n  -- These components are intended to be used within the mutation table cells.\n  -->\n\n<script type="text/template" id="mutation_table_case_id_template">\n\t<a href=\'{{linkToPatientView}}\' target=\'_blank\'>\n\t\t<b alt="{{caseIdTip}}"\n\t\t   class="{{caseIdClass}}">{{caseId}}</b>\n\t</a>\n</script>\n\n<script type="text/template" id="mutation_table_cancer_study_template">\n\t<a href=\'{{cancerStudyLink}}\' target=\'_blank\'>\n\t\t<b title="{{cancerStudy}}"\n\t\t   alt="{{cancerStudy}}"\n\t\t   class="cc-short-study-name simple-tip">{{cancerStudyShort}}</b>\n\t</a>\n</script>\n\n<script type="text/template" id="mutation_table_tumor_type_template">\n\t<span class=\'{{tumorTypeClass}}\' alt=\'{{tumorTypeTip}}\'>\n\t\t{{tumorType}}\n\t</span>\n</script>\n\n<script type="text/template" id="mutation_table_protein_change_template">\n\t<span class=\'{{proteinChangeClass}}\' alt=\'{{proteinChangeTip}}\'>\n\t\t<a>{{proteinChange}}</a>\n\t</span>\n    <span class=\'mutation-table-additional-protein-change simple-tip\'\n          alt=\'{{additionalProteinChangeTip}}\'>\n        <img height=12 width=12 style=\'opacity:0.2\' src=\'images/warning.gif\'>\n    </span>\n\t<a href=\'{{pdbMatchLink}}\' class="mutation-table-3d-link">\n\t\t<span class="mutation-table-3d-icon">3D</span>\n\t</a>\n</script>\n\n<script type="text/template" id="mutation_table_mutation_type_template">\n\t<span class=\'{{mutationTypeClass}}\'>\n\t\t<label>{{mutationTypeText}}</label>\n\t</span>\n</script>\n\n<script type="text/template" id="mutation_table_cna_template">\n\t<label alt=\'{{cnaTip}}\' class=\'simple-tip {{cnaClass}}\'>{{cna}}</label>\n</script>\n\n<script type="text/template" id="mutation_table_cosmic_template">\n\t<label class=\'{{cosmicClass}}\'>{{cosmicCount}}</label>\n</script>\n\n<script type="text/template" id="mutation_table_mutation_status_template">\n\t<span alt=\'{{mutationStatusTip}}\' class=\'simple-tip {{mutationStatusClass}}\'>\n\t\t<label>{{mutationStatusText}}</label>\n\t</span>\n</script>\n\n<script type="text/template" id="mutation_table_validation_status_template">\n\t<span alt=\'{{validationStatusTip}}\' class="simple-tip {{validationStatusClass}}">\n\t\t<label>{{validationStatusText}}</label>\n\t</span>\n</script>\n\n<script type="text/template" id="mutation_table_mutation_assessor_template">\n\t<span class=\'{{omaClass}} {{fisClass}}\'>\n\t\t<label>{{fisText}}</label>\n\t</span>\n</script>\n\n<script type="text/template" id="mutation_table_start_pos_template">\n\t<label class=\'{{startPosClass}}\'>{{startPos}}</label>\n</script>\n\n<script type="text/template" id="mutation_table_end_pos_template">\n\t<label class=\'{{endPosClass}}\'>{{endPos}}</label>\n</script>\n\n<script type="text/template" id="mutation_table_tumor_freq_template">\n\t<label alt=\'<b>{{tumorAltCount}}</b> variant reads out of <b>{{tumorTotalCount}}</b> total\'\n\t       class=\'{{tumorFreqClass}} {{tumorFreqTipClass}}\'>{{tumorFreq}}</label>\n</script>\n\n<script type="text/template" id="mutation_table_normal_freq_template">\n\t<label alt=\'<b>{{normalAltCount}}</b> variant reads out of <b>{{normalTotalCount}}</b> total\'\n\t       class=\'{{normalFreqClass}} {{normalFreqTipClass}}\'>{{normalFreq}}</label>\n</script>\n\n<script type="text/template" id="mutation_table_tumor_ref_count_template">\n\t<label class=\'{{tumorRefCountClass}}\'>{{tumorRefCount}}</label>\n</script>\n\n<script type="text/template" id="mutation_table_tumor_alt_count_template">\n\t<label class=\'{{tumorAltCountClass}}\'>{{tumorAltCount}}</label>\n</script>\n\n<script type="text/template" id="mutation_table_normal_ref_count_template">\n\t<label class=\'{{normalRefCountClass}}\'>{{normalRefCount}}</label>\n</script>\n\n<script type="text/template" id="mutation_table_normal_alt_count_template">\n\t<label class=\'{{normalAltCountClass}}\'>{{normalAltCount}}</label>\n</script>\n\n<script type="text/template" id="mutation_table_igv_link_template">\n\t<a href=\'{{igvLink}}\' class=\'igv-link\'>\n\t\t<span class="mutation-table-igv-icon">IGV</span>\n\t</a>\n</script>\n\n<script type="text/template" id="mutation_table_placeholder_template">\n    <img width=\'{{width}}\' height=\'{{height}}\' src=\'{{loaderImage}}\'/>\n</script>\n\n<script type="text/template" id="mutation_table_mutation_count_template">\n\t<label class=\'{{mutationCountClass}}\'>{{mutationCount}}</label>\n</script>\n\n<script type="text/template" id="mutation_table_cbio_portal_template">\n    <label class=\'{{portalClass}}\'>{{portalFrequency}}</label>\n</script>\n\n<!-- end Mutation Table components -->\n\n<script type="text/template" id="mutation_details_cosmic_tip_template">\n\t<div class=\'cosmic-details-tip-info\'>\n\t\t<b>{{cosmicTotal}} occurrences of {{mutationKeyword}} mutations in COSMIC</b>\n\t</div>\n\t<table class=\'cosmic-details-table display\'\n\t       cellpadding=\'0\' cellspacing=\'0\' border=\'0\'>\n\t\t<thead>\n\t\t\t<tr>\n\t\t\t\t<th>COSMIC ID</th>\n\t\t\t\t<th>Protein Change</th>\n\t\t\t\t<th>Count</th>\n\t\t\t</tr>\n\t\t</thead>\n\t\t<tbody>{{cosmicDataRows}}</tbody>\n\t</table>\n</script>\n\n<script type="text/template" id="mutation_details_fis_tip_template">\n\tPredicted impact score: <b>{{impact}}</b>\n\t<div class=\'mutation-assessor-main-link mutation-assessor-link\'>\n\t\t<a href=\'{{linkOut}}\' target=\'_blank\'>\n\t\t\t<img height=15 width=19 src=\'images/ma.png\'>\n\t\t\tGo to Mutation Assessor\n\t\t</a>\n\t</div>\n\t<div class=\'mutation-assessor-msa-link mutation-assessor-link\'>\n\t\t<a href=\'{{msaLink}}\' target=\'_blank\'>\n\t\t\t<span class="ma-msa-icon">msa</span>\n\t\t\tMultiple Sequence Alignment\n\t\t</a>\n\t</div>\n\t<div class=\'mutation-assessor-3d-link mutation-assessor-link\'>\n\t\t<a href=\'{{pdbLink}}\' target=\'_blank\'>\n\t\t\t<span class="ma-3d-icon">3D</span>\n\t\t\tMutation Assessor 3D View\n\t\t</a>\n\t</div>\n</script>\n\n<script type="text/template" id="pancan_mutation_hist_tip_template">\n    <div>\n        <div>\n            <h3>{{gene}} mutations across all cancer studies</h3>\n        </div>\n        <div style=\'float:right;\'>\n            <button class=\'cross-cancer-download\' file-type=\'pdf\'>PDF</button>\n            <button class=\'cross-cancer-download\' file-type=\'svg\'>SVG</button>\n        </div>\n    </div>\n    <div>\n        <p class="overall-count"></p>\n    </div>\n    <div class="pancan-histogram-container"></div>\n</script>\n<script type="text/template" id="default_mutation_details_template">\n\t<div class=\'mutation-3d-container\'></div>\n\t<div class=\'mutation-details-loader\'>\n\t\t<img src=\'{{loaderImage}}\'/>\n\t</div>\n\t<div class=\'mutation-details-content\'>\n\t\t<ul>\n\t\t\t{{listContent}}\n\t\t</ul>\n\t\t{{mainContent}}\n\t</div>\n</script>\n\n<script type="text/template" id="default_mutation_details_main_content_template">\n\t<div id=\'mutation_details_{{geneId}}\'>\n\t\t<img src=\'{{loaderImage}}\'/>\n\t</div>\n</script>\n\n<script type="text/template" id="default_mutation_details_list_content_template">\n\t<li>\n\t\t<a href="#mutation_details_{{geneId}}"\n\t\t   class="mutation-details-tabs-ref"\n\t\t   title="{{geneSymbol}} mutations">\n\t\t\t<span>{{geneSymbol}}</span>\n\t\t</a>\n\t</li>\n</script>\n\n<script type="text/template" id="default_mutation_details_info_template">\n\t<p>There are no mutation details available for the gene set entered.</p>\n\t<br>\n\t<br>\n</script>\n\n<script type="text/template" id="default_mutation_details_gene_info_template">\n\t<p>There are no mutation details available for this gene.</p>\n\t<br>\n\t<br>\n</script>\n\n<script type="text/template" id="mutation_view_template">\n\t<h4>{{geneSymbol}}: {{mutationSummary}}</h4>\n\t<div>\n\t\t<table>\n\t\t\t<tr>\n\t\t\t\t<td>\n\t\t\t\t\t<div class=\'mutation-diagram-view\'></div>\n\t\t\t\t</td>\n\t\t\t\t<td valign="bottom">\n\t\t\t\t\t<div class="mutation-3d-initializer"></div>\n\t\t\t\t</td>\n\t\t\t</tr>\n\t\t</table>\n\t</div>\n\t<div class="mutation-pdb-panel-view"></div>\n\t<div class=\'mutation-details-no-data-info\'>\n\t\tThere are no {{geneSymbol}} mutations in the selected samples.\n\t</div>\n\t<div class=\'mutation-details-filter-info\'>\n\t\tCurrent view shows filtered results.\n\t\tClick <a class=\'mutation-details-filter-reset\'>here</a> to reset all filters.\n\t</div>\n\t<div class=\'mutation-table-container\'>\n\t\t<img src=\'images/ajax-loader.gif\'/>\n\t</div>\n</script>\n\n<script type="text/template" id="mutation_diagram_view_template">\n\t<div class=\'mutation-diagram-toolbar\'>\n\t\t<a href=\'http://www.uniprot.org/uniprot/{{uniprotId}}\'\n\t\t   class=\'mutation-details-uniprot-link\'\n\t\t   target=\'_blank\'>{{uniprotId}}</a>\n\t\t<span class=\'mutation-diagram-toolbar-buttons\'>\n\t\t\t<button class=\'diagram-to-pdf\'>PDF</button>\n\t\t\t<button class=\'diagram-to-svg\'>SVG</button>\n\t\t\t<button class="diagram-customize">Customize</button>\n\t\t\t<button class="diagram-help">Color Codes</button>\n\t\t</span>\n\t</div>\n\t<div class="mutation-diagram-help ui-widget"></div>\n\t<div class="mutation-diagram-customize ui-widget"></div>\n\t<div class=\'mutation-diagram-container\'></div>\n</script>\n\n<script type="text/template" id="mutation_customize_panel_template">\n\t<div class="diagram-customize-close">\n\t\t<a href="#">&times;</a>\n\t</div>\n\t<h4>Customize</h4>\n\t<table>\n\t\t<tr>\n\t\t\t<td>\n\t\t\t\t<div class="diagram-y-axis-slider-area">\n\t\t\t\t\t<div class="diagram-slider-title"><label>max y-axis value</label></div>\n\t\t\t\t\t<table>\n\t\t\t\t\t\t<tr>\n\t\t\t\t\t\t\t<td width="90%" valign="top">\n\t\t\t\t\t\t\t\t<div class="diagram-y-axis-slider"></div>\n\t\t\t\t\t\t\t\t<span class="diagram-slider-min-label">{{minY}}</span>\n\t\t\t\t\t\t\t\t<span class="diagram-slider-max-label">{{maxY}}</span>\n\t\t\t\t\t\t\t</td>\n\t\t\t\t\t\t\t<td valign="top">\n\t\t\t\t\t\t\t\t<input class="diagram-y-axis-limit-input" size="2" type=\'text\'>\n\t\t\t\t\t\t\t</td>\n\t\t\t\t\t\t</tr>\n\t\t\t\t\t</table>\n\t\t\t\t</div>\n\t\t\t</td>\n\t\t</tr>\n\t</table>\n</script>\n\n<script type="text/template" id="mutation_help_panel_template">\n\t<div class="diagram-help-close">\n\t\t<a href="#">&times;</a>\n\t</div>\n\t<h4>Color Codes</h4>\n\t<div>\n\t\tMutation diagram circles are colored with respect to\n\t\tthe corresponding mutation types. In case of different mutation<br>\n\t\ttypes at a single position, color of the circle is determined\n\t\twith respect to the most frequent mutation type.<br><br>\n\t\tMutation types and corresponding color codes are as follows:\n\t\t<ul>\n\t\t\t<li><span class=\'missense_mutation\'>Missense Mutations</span></li>\n\t\t\t<li><span class=\'trunc_mutation\'>Truncating Mutations</span>\n\t\t\t\t: Nonsense, Nonstop, Frameshift deletion, Frameshift insertion, Splice site</li>\n\t\t\t<li><span class=\'inframe_mutation\'>Inframe Mutations</span>\n\t\t\t\t: Inframe deletion, Inframe insertion</li>\n\t\t\t<li><span class=\'other_mutation\'>Other Mutations</span>\n\t\t\t\t: All other types of mutations</li>\n\t\t\t<li>Circles colored with <span class=\'mutation-3d-tied\'>purple</span>\n\t\t\t\tindicate residues that are affected by different mutation types<br>\n\t\t\t\tat the same proportion.</li>\n\t\t</ul>\n\t</div>\n</script>\n\n<script type="text/template" id="mutation_details_region_tip_template">\n\t<div class="diagram-region-tip">\n\t\t<div>{{identifier}} {{type}}, {{description}} ({{start}} - {{end}})</div>\n        <div>\n            <a href="http://pfam.xfam.org/family/{{pfamAccession}}" class="diagram-pfam-link "target="_blank">PFAM</a>\n            {{mutationAlignerInfo}}\n        </div>\n\t</div>\n</script>\n\n<script type="text/template" id="mutation_aligner_info_template">\n    <a href="{{linkToMutationAligner}}" target="_blank">Mutation Aligner</a>\n</script>\n\n<script type="text/template" id="mutation_details_lollipop_tip_template">\n\t<div>\n\t\t<div class=\'diagram-lollipop-tip\'>\n\t\t\t<b>{{count}} {{mutationStr}}</b>\n\t\t\t<br/>AA Change: {{label}}\n\t\t\t<div class="lollipop-stats">\n\t\t\t\t<table>\n\t\t\t\t\t<thead>\n\t\t\t\t\t<tr>\n\t\t\t\t\t\t<th>Cancer Type</th>\n\t\t\t\t\t\t<th>Count</th>\n\t\t\t\t\t</tr>\n\t\t\t\t\t</thead>\n\t\t\t\t\t<tbody>\n\t\t\t\t\t</tbody>\n\t\t\t\t</table>\n\t\t\t</div>\n\t\t</div>\n\t</div>\n</script>\n\n<script type="text/template" id="mutation_details_lollipop_tip_stats_template">\n\t<tr>\n\t\t<td>{{cancerType}}</td>\n\t\t<td>{{count}}</td>\n\t</tr>\n</script>\n<script type="text/template" id="pdb_panel_view_template">\n\t<table class=\'mutation-pdb-main-container\'>\n\t\t<tr>\n\t\t\t<td valign="top">\n\t\t\t\t<div class=\'mutation-pdb-panel-container\'></div>\n\t\t\t</td>\n\t\t</tr>\n\t\t<tr>\n\t\t\t<td valign="top" align="center">\n\t\t\t\t<button class=\'expand-collapse-pdb-panel\'\n\t\t\t\t        title=\'Expand/Collapse PDB Chains\'></button>\n\t\t\t</td>\n\t\t</tr>\n\t\t<tr class=\'pdb-table-controls\'>\n\t\t\t<td>\n\t\t\t\t<span class="triangle triangle-right ui-icon ui-icon-triangle-1-e"></span>\n\t\t\t\t<span class="triangle triangle-down ui-icon ui-icon-triangle-1-s"></span>\n\t\t\t\t<a href="#" class=\'init-pdb-table\'>PDB Chain Table</a>\n\t\t\t</td>\n\t\t</tr>\n\t\t<tr>\n\t\t\t<td>\n\t\t\t\t<div class=\'pdb-table-wrapper\'>\n\t\t\t\t\t<div class="mutation-pdb-table-view"></div>\n\t\t\t\t</div>\n\t\t\t</td>\n\t\t</tr>\n\t</table>\n</script>\n\n<script type="text/template" id="mutation_details_pdb_chain_tip_template">\n\t<span class=\'pdb-chain-tip\'>\n\t\tPDB\n\t\t<a href="http://www.rcsb.org/pdb/explore/explore.do?structureId={{pdbId}}"\n\t\t   target="_blank">\n\t\t\t<b>{{pdbId}}</b>\n\t\t</a>\n\t\t<span class="chain-rectangle-tip-pdb-info">{{pdbInfo}}</span><br>\n\t\tChain <b>{{chainId}}</b>\n\t\t<span class="chain-rectangle-tip-mol-info">{{molInfo}}</span>\n\t</span>\n</script>\n\n<script type="text/template" id="mutation_details_pdb_help_tip_template">\n\t<span class=\'pdb-chain-tip\'>\n\t\tThis panel displays a list of PDB chains for the corresponding uniprot ID.\n\t\tPDB chains are ranked with respect to their sequence similarity ratio,\n\t\tand aligned to the y-axis of the mutation diagram.\n\t\tHighly ranked chains have darker color than the lowly ranked ones.<br>\n\t\t<br>\n\t\tEach chain is represented by a single rectangle.\n\t\tGaps within the chains are represented by a thin line connecting the segments of the chain.<br>\n\t\t<br>\n\t\tBy default, only a first few rows are displayed.\n\t\tTo see more chains, use the scroll bar next to the panel.\n\t\tTo see the detailed list of all available PDB chains in a table\n\t\tclick on the link below the panel.<br>\n\t\t<br>\n\t\tTo select a chain, simply click on it.\n\t\tSelected chain is highlighted with a different frame color.\n\t\tYou can also select a chain by clicking on a row in the table.\n\t\tSelecting a chain reloads the PDB data for the 3D structure visualizer.\n\t</span>\n</script>\n<script type="text/template" id="pdb_table_view_template">\n\t<div class=\'pdb-chain-table-loader\'>\n\t\t<img src=\'{{loaderImage}}\'/>\n\t</div>\n\t<table>\n\t\t<tr>\n\t\t\t<td valign="top" class=\'pdb-chain-table-container\'>\n\t\t\t\t<table class=\'display pdb-chain-table\'\n\t\t\t\t       cellpadding=\'0\' cellspacing=\'0\' border=\'0\'>\n\t\t\t\t</table>\n\t\t\t</td>\n\t\t\t<td></td>\n\t\t</tr>\n\t</table>\n</script>\n\n<!-- PDB Table components\n-- These components are intended to be used within PDB table cells.\n-->\n\n<script type="text/template" id="mutation_pdb_table_pdb_cell_template">\n\t<a href="http://www.rcsb.org/pdb/explore/explore.do?structureId={{pdbId}}"\n\t   target="_blank"><b>{{pdbId}}</b></a>\n</script>\n\n<script type="text/template" id="mutation_pdb_table_chain_cell_template">\n\t<span class="pbd-chain-table-chain-cell">\n\t\t<label>{{chainId}}</label>\n\t\t<a href="#" class="pdb-table-3d-link">\n\t\t\t<span alt="Click to update the 3D view with this chain"\n\t\t\t      class="pdb-table-3d-icon">3D</span>\n\t\t</a>\n\t</span>\n</script>\n\n<script type="text/template" id="mutation_pdb_table_summary_cell_template">\n\t<b>pdb:</b> {{summary}} <br>\n\t<b>chain:</b> {{molecule}}\n</script>';

}
return __p
}})();