/* switchDarkMode JS */
function switchDarkMode() { // Switch Between Light And Dark Mode
    const nowMode = document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light'
    if (nowMode === 'light') {
      activateDarkMode()
      saveToLocal.set('theme', 'dark', 2)
      GLOBAL_CONFIG.Snackbar !== undefined && btf.snackbarShow(GLOBAL_CONFIG.Snackbar.day_to_night)
    } else {
      activateLightMode()
      saveToLocal.set('theme', 'light', 2)
      GLOBAL_CONFIG.Snackbar !== undefined && btf.snackbarShow(GLOBAL_CONFIG.Snackbar.night_to_day)
    }
    // handle some cases
    typeof utterancesTheme === 'function' && utterancesTheme()
    typeof FB === 'object' && window.loadFBComment()
    window.DISQUS && document.getElementById('disqus_thread').children.length && setTimeout(() => window.disqusReset(), 200)
  }
/* hometop JS */
var bywind = {
    hideTodayCard: function() {
        document.getElementById("todayCard") && document.getElementById("todayCard").classList.add("hide")
    }
}
$(".topGroup").hover((function() {}
), (function() {
        document.getElementById("todayCard").classList.remove("hide"),
        document.getElementById("todayCard").style.zIndex = 1
    }
))
/* 文章封面自动提取色彩 */
if (document.getElementById('post-cover')) {
    const img = document.getElementById('post-cover').getAttribute('data-lazy-src')
    RGBaster.colors(img, {
        paletteSize: 30,
        exclude: ["rgb(255,255,255)", "rgb(0,0,0)", "rgb(254,254,254)"],
        success: function(t) {
          if (t.dominant != 'rgb()'){
            const c = t.dominant.match(/\d+/g);
            const Color = `rgba(${c[0]},${c[1]},${c[2]},0.8)`;
            let fontColor;
            //const grayLevel = c[0] * 0.299 + c[1] * 0.587 + c[2] * 0.114;
            const grayLevel = c[0] * 0.213 + c[1] * 0.715 + c[2] * 0.072;
            //if (grayLevel >= 190) {
            if (grayLevel >= 255/2) {
              // 若为浅色，把文字设置为黑色
              fontColor = '#000';
              metaColor = '#1C1C1C';
            } else {
              fontColor = '#fff';
              metaColor = '#eee';
            }
            document.styleSheets[0].addRule(":root", "--mj-main:" + Color + "!important")
            document.styleSheets[0].addRule(":root", "--mj-titlecolor:" + fontColor + "!important")
            document.styleSheets[0].addRule(":root", "--mj-metacolor:" + metaColor + "!important")
          } else {
            document.styleSheets[0].addRule(":root", "--mj-main: rgba(255,250,240,0.5) !important")
            document.styleSheets[0].addRule(":root", "--mj-titlecolor: #000 !important")
            document.styleSheets[0].addRule(":root", "--mj-metacolor: #1C1C1C !important")
          }
        },
        error: function() {
            document.styleSheets[0].addRule(":root", "--mj-main: rgba(255,250,240,0.5) !important")
            document.styleSheets[0].addRule(":root", "--mj-titlecolor: #000 !important")
            document.styleSheets[0].addRule(":root", "--mj-metacolor: #1C1C1C !important")
        }
    })
  } else {
    document.styleSheets[0].addRule(":root", "--mj-main: transparent !important")
    document.styleSheets[0].addRule(":root", "--mj-titlecolor: var(--light-grey) !important")
  }