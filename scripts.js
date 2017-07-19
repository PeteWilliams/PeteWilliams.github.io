var intZIndex = 100;
var arrPanels = new Array();

arrPanels['list'] = new Array();
arrPanels['list']['name'] = 'My Watchlist';
arrPanels['list2'] = new Array();
arrPanels['list2']['name'] = 'Open positions';
arrPanels['list3'] = new Array();
arrPanels['list3']['name'] = 'Working orders';
arrPanels['market'] = new Array();
arrPanels['market']['name'] = 'Apple';

var arrPanelSizes = new Array();
arrPanelSizes['list'] = [ [470, 555], [560, 555], [750, 555], [850, 555], [1500, 675] ];
arrPanelSizes['market'] = [ [209, 155], [270, 310], [500, 450], [780, 620], [1210, 910], [1600, 1100], [2000, 1225] ];

console.log( arrPanelSizes['list'] );

  $(function() {
	panelSetup();
  });

function panelSetup() {
		$( ".workspace-panel" ).resizable({containment: 'document', start: function(event) { $(this).css('z-index', intZIndex++); $('.ui-resizable-handle.ui-icon').addClass('resizing') }, stop: function(event) { $('.ui-resizable-handle.ui-icon').removeClass('resizing'); checkTicket( $(this) ); }});
		$( ".workspace-panel" ).draggable({snap: true, snapMode: "outer", snapTolerance: 13, containment: $('#u0'), handle: ".header", zIndex: function(event) {return intZIndex++}, stop: function(event) { $(this).css('z-index', intZIndex++)}});
  		$( '.workspace-panel' ).click( function(event) { $(this).css('z-index', intZIndex++) });
}

function biggerPanel( objPanel, strType ) {

	for (i=0; i <arrPanelSizes[strType].length; i++ ){
		if ( arrPanelSizes[strType][i][0] > objPanel.width() ) {
			break;
		}

	}
//	console.log( 'next: ' + arrPanelSizes[strType][i+1][0]);
	objPanel.animate({left: objPanel.position().left, top: objPanel.position().top, width: arrPanelSizes[strType][i+1][0], height: arrPanelSizes[strType][i+1][1] }, 200);

}

function smallerPanel( objPanel, strType ) {

	for (i=0; i <arrPanelSizes[strType].length; i++ ){
		if ( arrPanelSizes[strType][i][0] > objPanel.width() ) {
			break;
		}

	}
//	console.log( 'next: ' + arrPanelSizes[strType][i+1][0]);
	objPanel.animate({left: objPanel.position().left, top: objPanel.position().top, width: arrPanelSizes[strType][i-1][0], height: arrPanelSizes[strType][i-1][1] }, 200);

}

function maximisePanel( objPanel ) {

	if ( !objPanel.find('span.max').hasClass('maxed') ) {

		arrPanels[objPanel.attr('id')]['width'] = objPanel.width();
		arrPanels[objPanel.attr('id')]['height'] = objPanel.height();
		arrPanels[objPanel.attr('id')]['top'] = objPanel.position().top;
		arrPanels[objPanel.attr('id')]['left'] = objPanel.position().left;

		intWidth = $('#u0').width() - 2;
		intHeight = $('#u0').height() - 2;
		intLeft = 0;
		intTop = 0;

		objPanel.css( 'z-index', intZIndex++);

		$('.header li:not(.active)').addClass('hidden-tab');	


		var panel;

		for ( panel in arrPanels ) {

			strTabName = arrPanels[ panel ]['name'];

			if ( arrPanels[objPanel.attr('id')]['name'] != strTabName ) {
				objPanel.find('ul.nav-tabs').append( $('<li><a href="#"><span onclick="$(this).parent().parent().hide();" class="close-panel">x</span> ' + strTabName + '</a></li>').hide().fadeIn(400));
			}
		}

		objPanel.find('span.max').addClass('maxed');


	} else {

		$('.header li:not(.active)').fadeOut(400)
		intWidth = arrPanels[objPanel.attr('id')]['width'];
		intHeight = arrPanels[objPanel.attr('id')]['height'];
		intLeft = arrPanels[objPanel.attr('id')]['left'];
		intTop = arrPanels[objPanel.attr('id')]['top'];

		$('.header li:not(.active, .hidden-tab)').remove();
		$('.header li:not(.active)').removeClass('hidden-tab');

		objPanel.find('span.max').removeClass('maxed');

	}

	objPanel.animate({left: intLeft, top: intTop, width: intWidth, height: intHeight });
	
}

function resizePanel( intWidth, intHeight ) {
	$( '#market'+ intMidgetCount ).width( intWidth).height( intHeight );
}

function checkTicket( objPanel ){

	if ( objPanel.width() <= 269 && objPanel.width() > 210 && objPanel.height() <= 309 && objPanel.height() > 155 ) {
		objPanel.width( 268).height(308);
	} else if ( objPanel.width() <= 220 && objPanel.width() <= 349) {
		objPanel.width( 207).height(153);

	}


} 

function maximiseLastPanel() {
	maximisePanel( $( '#market'+ intMidgetCount ) );
}

var intMidgetCount = 1;

function newPanel( strName, blnChart ) {

	var intMidgetCountLocal = ++intMidgetCount;

	strChart = blnChart ? '' : '?no-chart';

	var strHtml = `
	<div id="market${intMidgetCountLocal}" class="workspace-panel market">
    <div class="header" ondblclick="maximisePanel( $(this).parent() );" >
      <ul class="nav nav-tabs">
        <li class="active"><a href="#"><span onclick="$(this).parents('.workspace-panel').hide();" class="close-panel">x</span> ${strName}</a></li>
      </ul>
      <span onclick="smallerPanel( $(this).parent().parent(), 'market' );" class="resize smaller"></span>
      <span onclick="biggerPanel( $(this).parent().parent(), 'market' );" class="resize bigger"></span>
      <span onclick="maximisePanel( $(this).parent().parent() );" class="resize max"></span>
    </div> 
	<div class="content">
	  <iframe src="market.html${strChart}" style="width: 100%; height: 100%;" scrolling="no"></iframe>
	</div>
	</div>
	`;

    $('#u0_div').append( strHtml );
    var pos = $( '#market'+ intMidgetCountLocal ).position();

    $( '#market'+ intMidgetCountLocal ).css({ 'z-index': intZIndex++, 'left': pos.left + (intMidgetCountLocal * 30), 'top': pos.top + (intMidgetCountLocal * 30) });
    panelSetup();


	arrPanels['market'+ intMidgetCountLocal] = new Array();
	arrPanels['market'+ intMidgetCountLocal]['name'] = strName;


}