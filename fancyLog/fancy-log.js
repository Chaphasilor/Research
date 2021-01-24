// use tailwind to style your console output <3

window.fancyLog = (text, twClasses) => {

  let tailwindRules = [...document.styleSheets[0].cssRules];
  let styles = twClasses.split(` `).map(twClass => {

    // console.log(`twClass:`, twClass);

    let found = tailwindRules.find(rule => {
      // console.log(`rule.selectorText:`, rule.selectorText);
      return rule.selectorText == `.${twClass}`;
    })

    if (found) {

      let property = found.style[found.style.length-1];
      let value = found.style.getPropertyValue(found.style[found.style.length-1]);;

      // console.log(`value:`, value);
      
      switch (property) {
        case `color`:
          value = value.split(`,`).slice(0, -1).join(`,`) + `)`;
          break;
        case `background-color`:
          value = value.split(`,`).slice(0, -1).join(`,`) + `)`;
          break;
      
        default:
          break;
      }
      
      // console.log(`value:`, value);
      
      return `${property}: ${value};`;
      
    } else {

      // console.warn(`tailwind class not found!`);
      
      return ``;

    }
    
  })

  let logStyles = styles.join(``);

  // console.log(`logStyles:`, logStyles);

  window.console.log(`%c${text}`, logStyles);
    
}