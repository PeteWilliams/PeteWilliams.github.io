var intZIndex = 100;
var arrPanels = new Array();

  $(function() {
	panelSetup();
  });

function panelSetup() {
		$( ".workspace-panel" ).resizable({containment: 'document', start: function(event) { $(this).css('z-index', intZIndex++); $('.ui-resizable-handle.ui-icon').addClass('resizing') }, stop: function(event) { $('.ui-resizable-handle.ui-icon').removeClass('resizing') }});
		$( ".workspace-panel" ).draggable({containment: $('#u0'), handle: ".header", zIndex: function(event) {return intZIndex++}, stop: function(event) { $(this).css('z-index', intZIndex++)}});
  		$( '.workspace-panel' ).click( function(event) { $(this).css('z-index', intZIndex++) });
}

function maximisePanel( objPanel ) {

	if ( objPanel.find('span.max').text() == '+' ) {

		arrPanels[objPanel.attr('id')] = new Array();
		arrPanels[objPanel.attr('id')]['width'] = objPanel.width();
		arrPanels[objPanel.attr('id')]['height'] = objPanel.height();
		arrPanels[objPanel.attr('id')]['top'] = objPanel.position().top;
		arrPanels[objPanel.attr('id')]['left'] = objPanel.position().left;

		intWidth = $('#u0').width() - 20;
		intHeight = $('#u0').height() - 20;
		intLeft = 10;
		intTop = 10;

		objPanel.css( 'z-index', intZIndex++);

		objPanel.find('span.max').text('-');

	} else {

		intWidth = arrPanels[objPanel.attr('id')]['width'];
		intHeight = arrPanels[objPanel.attr('id')]['height'];
		intLeft = arrPanels[objPanel.attr('id')]['left'];
		intTop = arrPanels[objPanel.attr('id')]['top'];
		objPanel.find('span.max').text('+');

	}
	
	objPanel.animate({left: intLeft, top: intTop, width: intWidth, height: intHeight });
	
}

var intMidgetCount = 1;

function newPanel( strName ) {

var intMidgetCountLocal = ++intMidgetCount;

var strHtml = `
<div id="market${intMidgetCountLocal}" class="workspace-panel market">
<div class="header"><span onclick="$(this).parent().parent().hide();" class="close-panel">x</span>${strName}<span onclick="maximisePanel( $(this).parent().parent() );" class="max">+</span></div> 
<div class="content">
  <iframe src="market.html" style="width: 100%; height: 100%;" scrolling="no"></iframe>
</div>
</div>
`;

        $('#u0_div').append( strHtml );
        var pos = $( '#market'+ intMidgetCountLocal ).position();

        $( '#market'+ intMidgetCountLocal ).css({ 'z-index': intZIndex++, 'left': pos.left + (intMidgetCountLocal * 30), 'top': pos.top + (intMidgetCountLocal * 30) });
        panelSetup();

          
}
