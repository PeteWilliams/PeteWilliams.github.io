var intZIndex = 100;
var arrPanels = new Array();

  $(function() {
		$( ".workspace-panel" ).resizable({containment: 'document'}).draggable({containment: $('#u0'), handle: ".header", zIndex: function(event) {return intZIndex++}, stop: function(event) { $(this).css('z-index', intZIndex++)}});
  });


function maximisePanel( objPanel ) {

	if ( objPanel.find('span').text() == '+' ) {

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

		objPanel.find('span').text('-');

	} else {

		intWidth = arrPanels[objPanel.attr('id')]['width'];
		intHeight = arrPanels[objPanel.attr('id')]['height'];
		intLeft = arrPanels[objPanel.attr('id')]['left'];
		intTop = arrPanels[objPanel.attr('id')]['top'];
		objPanel.find('span').text('+');

	}
	
	objPanel.animate({left: intLeft, top: intTop, width: intWidth, height: intHeight });
	
}


