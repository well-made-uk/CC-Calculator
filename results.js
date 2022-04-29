function genBadge(debugName,debugFootprint) {
    jQuery(".preloader").show()
    jQuery(".badge").css('opacity', '0')
    jQuery(".preloader").css('opacity', '1')
    if (!canvas.getContext) {
        return
    }

    // Set text direction
    if (rtl) {canvas.setAttribute('dir', 'rtl')}
    ctx = canvas.getContext('2d')

    // Set up name
    if (debugName) {
      badgeName = (debugName + language.line1.plural)
    } else if (data.name) {
      badgeName = (data.name + language.line1.plural)
    } else {
      badgeName = language.line1.my
    }

    // Add background and border colors
    ctx.fillStyle = styling.textColor
    ctx.fillRect(0, 0, 1050, 1050)
    ctx.fillStyle = styling.bgColor
    ctx.fillRect(10, 10, 1030, 1030)

    // Load background image in memory
    image     = new Image()
    image.src = styling.bgImg
    // Wait until image has loaded...
    function mainImageLoop(){
    if(image.complete){
        // Draw test images/fonts off-canvas
        ctx.drawImage(image, 0, 0, 1050, 1050)
        ctx.font = styling.font1
        ctx.fillText(badgeName, 2000, 2000)
        ctx.font = styling.font2
        ctx.fillText(badgeName, 2000, 2000)
        ctx.font = styling.font3
        ctx.fillText(badgeName, 2000, 2000)

        setTimeout(function() {
        // Font Properties
        ctx.fillStyle = styling.textColor
        ctx.textAlign = "center"
        ctx.font      = styling.font1

        // Add Name
        ctx.fillText(badgeName, 525, styling.text1pos)

        // Add 'Carbon Footprint'
        ctx.font = styling.font1
        ctx.fillText(language.line2.carbon, 525, styling.text2pos)

        // Add number
        if (styling.shadow) {
            ctx.fillStyle = styling.shadow
            ctx.font = styling.font2
            if (debugFootprint) {
              ctx.fillText(debugFootprint, 545, (styling.text3pos + 20))
            } else {
              ctx.fillText(data.footprint.toFixed(1), 545, (styling.text3pos + 20))
            }
        }
        ctx.fillStyle = styling.textColor
        ctx.font = styling.font2
        if (debugFootprint) {
          ctx.fillText(debugFootprint, 525, styling.text3pos)
        } else {
          ctx.fillText(data.footprint.toFixed(1), 525, styling.text3pos)
        }

        // Add 'tonnes of CO2'
        ctx.font = styling.font3
        ctx.fillText(language.line4.tonnes, 525, styling.text4pos)

        // Add 'annually'
        ctx.font = styling.font3
        ctx.fillText(language.line5.annually, 525, styling.text5pos)

        // Add 'TM' if enabled
        if (styling.tm) {
            ctx.font = "25px Avenir"
            ctx.fillText("TM", 525, styling.tm)
        }

        let badge = canvas.toDataURL('image/jpeg', 2)

        // Link up elements on the page
        jQuery('.badge').attr('src', badge)
        jQuery('#badgeButton').attr('href', badge)
        jQuery('#badgeButton').attr('download', 'My carbon footprint')
        jQuery('.badge').css('opacity', '1')
        jQuery('.preloader').hide()
        }, 400)
     } else{
          // If the image hasn't loaded, go back and check again
          requestAnimationFrame(mainImageLoop)
     }



    }
    mainImageLoop()
  }

    jQuery('document').ready(($) => {

    // Display the page when everything has loaded
    $('body').css('opacity','1')

    // Set Default (non-branded) variables (can be overridden in branding)
    data = {
      // Get the Data from the FRM view
      name :                  $('#data-name').text(),
      badgeName :             '',
      badgeBG :               "/wp-content/uploads/2022/03/Standard-Badge-BG.png",
      footprint :             +($('#data-yearly-footprint').text()),
      footprintDaily :        $('#data-daily-footprint').text(),
      commute :               $('#data-commute-score').text(),
      flight :                $('#data-flight-score').text(),
      diet :                  $('#data-diet-score').text(),
      shopping :              $('#data-shopping-score').text(),
      energy :                $('#data-energy-score').text(),
      countryAverage :        +($('#data-country').text()),
      countryLabel :          $('#label-country').text(),
      householdYearly :       $('#data-household-tonnes').text(),
      consumptionYearly :     $('#data-consumption-tonnes').text(),
      transportationYearly :  $('#data-transportation-tonnes').text(),
      householdPercent :      $('#data-household-percent').text(),
      consumptionPercent :    $('#data-consumption-percent').text(),
      transportationPercent : $('#data-transportation-percent').text()
    }

    styling = {
      // Default Styling
      font1 :       "70px Avenir",
      font2 :       "normal 800 260px Berlingske",
      font3 :       "100px Avenir",
      font4 :       "100px Avenir",
      text1pos :    205,
      text2pos :    280,
      text3pos :    545,
      text4pos :    690,
      text5pos :    785,
      shadow :      '',
      tm :          1020,
      textColor :   'Black',
      bgColor :     "#f9da4b",
      bgImg :       '/wp-content/uploads/2022/03/Standard-Badge-BG.png',
      borderColor : 'black'
    }

    socials = {
      // Default social media links (can be overridden in branding)
      instagram : 'https://www.instagram.com/clever.carbon/',
      twitter :   'https://mobile.twitter.com/clever_carbon',
      facebook :  'https://www.facebook.com/theclevercarbon/',
      linkedin :  'https://www.linkedin.com/company/clevercarbon'
    }

    // Right-to-left?
    rtl = false

    // Create badge canvas
    canvas = document.createElement('canvas')
    $(canvas)
       .text('unsupported browser')
       .attr('width', 1050)       // for pixels
       .attr('height', 1050)
       .width('300px')
       .height('300px')



  // Set SVG path strokes to 4
  $("path").attr('stroke-width','4')

  // Get URL parameters
  urlParams = new URLSearchParams(window.location.search)

  // Get referrer
  ref = urlParams.get('ref')
  // Override default ref:
  // if (!ref) {ref = 'earthday'}

  // Set "start again" URL
  const startAgain = "/quiz?ref=" + ref

  // Functions

  // Match badge height and width
  function badgeSize() {
      $('.badge').css('height',jQuery('.badge').css('width'))
  }

  // Set up the score balls
  function dataBalls() {
    // Commute Balls
    if (data.commute < 1) {
        $('li.commute .ball1').css('background','var(--accent-color-1)')
    } else if (data.commute == 1) {
        $('li.commute .ball2').css('background','var(--accent-color-2)')
    } else {
        $('li.commute .ball3').css('background','var(--accent-color-3)')
    }

    // Flight Balls
    if (data.flight < 5) {
        $('li.flying .ball1').css('background','var(--accent-color-1)')
    } else if (data.flight > 4 && data.flight < 10 ) {
        $('li.flying .ball2').css('background','var(--accent-color-2)')
    } else {
        $('li.flying .ball3').css('background','var(--accent-color-3)')
    }

    // Diet Balls
    if (data.diet < 1) {
        $('li.diet .ball1').css('background','var(--accent-color-1)')
    } else if (data.diet == 1) {
        $('li.diet .ball2').css('background','var(--accent-color-2)')
    } else {
        $('li.diet .ball3').css('background','var(--accent-color-3)')
    }

    // Shopping Balls
    if (data.shopping < 1) {
        $('li.shopping .ball1').css('background','var(--accent-color-1)')
    } else if (data.shopping == 1) {
        $('li.shopping .ball2').css('background','var(--accent-color-2)')
    } else {
        $('li.shopping .ball3').css('background','var(--accent-color-3)')
    }

    // Energy Balls
    if (data.energy < 1) {
        $('li.energy .ball1').css('background','var(--accent-color-1)')
    } else if (data.energy == 1) {
        $('li.energy .ball2').css('background','var(--accent-color-2)')
    } else {
        $('li.energy .ball3').css('background','var(--accent-color-3)')
    }
  }

  // Set up score bars
  function dataBars() {
    // Set value and tooltip text
    $('.bar.your-results').attr('value',data.footprint)
    $('.bar.your-results .tooltip').text(data.footprint.toFixed(1) + 't')
    $('.bar.average-results').attr('value',data.countryAverage)
    $('.bar.average-results .tooltip').text(data.countryAverage.toFixed(1) + 't')

    $('.key.your').text(data.footprint.toFixed(1))
    $('.key.average').text(data.countryAverage.toFixed(1))

    $('.results-yearly').text((Math.ceil(data.footprint * 10) / 10) + 't')
    $('.results-daily').text(Math.ceil(data.footprintDaily * 10) / 10)
    $('.name').text(data.name)
    // Get the bars
    var bars = document.getElementsByClassName('bar')
    // Which bar is longest?
    var longest = 0
    for (var bar of bars) {
        if (parseFloat(bar.getAttribute('value')) > longest) {
            longest = parseFloat(bar.getAttribute('value'))}}
    // Set bar length relative to the longest one
    for (var bar of bars) {
        bar.style.width = `${parseFloat(bar.getAttribute('value')) /    longest * 100}%`}
  }

  // Set up BG color changers for badge
  function colorPicker() {
    // Check for referrer
    switch(ref) {
      case 'earthday':
      // Set ball color
      $('.bgChangeOne').css('background','#F7D849')
      $('.bgChangeTwo').css('background','#FDBFFC')
      $('.bgChangeThree').css('background','#62D580')

      // Set background image/color
      $('.bgChangeOne').on('click', () => {
          styling.bgColor = "#FFDB43"
          styling.bgImg   = "/wp-content/uploads/2022/03/Square-01-comp.jpg"
          $('.badge').css('border','none')
          genBadge()
      })
      $('.bgChangeTwo').on('click', () => {
          styling.bgColor = "#B0F0EA"
          styling.bgImg   = "/wp-content/uploads/2022/03/Square-02-comp.jpg"
          $('.badge').css('border','none')
          genBadge()
      })
      $('.bgChangeThree').on('click', () => {
          styling.bgColor = "#F6C7FB"
          styling.bgImg   = "/wp-content/uploads/2022/03/Square-03-comp.jpg"
          $('.badge').css('border','none')
          genBadge()
      })
      break
      default:
      // Set ball color
      $('.bgChangeOne').css('background','#FFDB43')
      $('.bgChangeTwo').css('background','#B0F0EA')
      $('.bgChangeThree').css('background','#F6C7FB')

      // Set background image/color
      $('.bgChangeOne').on('click', () => {
          styling.bgColor = "#FFDB43"
          styling.bgImg   = "/wp-content/uploads/2022/03/Standard-Badge-BG.png"
          genBadge()
      })
      $('.bgChangeTwo').on('click', () => {
          styling.bgColor = "#B0F0EA"
          styling.bgImg   = "/wp-content/uploads/2022/03/Standard-Badge-BG.png"
          genBadge()
      })
      $('.bgChangeThree').on('click', () => {
          styling.bgColor = "#F6C7FB"
          styling.bgImg   = "/wp-content/uploads/2022/03/Standard-Badge-BG.png"
          genBadge()
      })

    }
  }

  // Link up the social buttons
  function linkSocials() {
    $('.socials li:nth-child(1) a').attr('href',socials.instagram)
    $('.socials li:nth-child(2) a').attr('href',socials.twitter)
    $('.socials li:nth-child(3) a').attr('href',socials.facebook)
    $('.socials li:nth-child(4) a').attr('href',socials.linkedin)
  }

  // Erce's whitelabel/iframe script
  function whiteLabel() {
    if (window.location != window.parent.location) {
        var style = document.createElement('style')

        style.innerHTML = `
        .elementor-location-header {display:none}
        .elementor-location-footer {display:none}`

        document.head.appendChild(style)
    }
  }

  // "Picker" object to hide/show the color picker (depending on referrer)
  picker = {
    show : function() {$('.colorPicker').show()},
    hide : function() {$('.colorPicker').hide()},
  }

  // "Border" object to hide/show the badge border (depending on referrer)
  border = {
    show : function() {$('.badge').css('border','3px solid ' + styling.borderColor)},
    hide : function() {$('.badge').css('border','0')}
  }

  // Run all of the functions
  whiteLabel()
  badgeSize()
  colorPicker()
  dataBalls()
  dataBars()
  linkSocials()
  checkBranding(ref)
})
