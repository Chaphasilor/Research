// use tailwind to style your console output <3

window.fancyLog = (...args) => {

  if (args.length > 1 && args[0].includes(`%c`) && typeof args[1] === `string`) {

    let tailwindRules = [...document.styleSheets[0].cssRules];
    let styles = args[1].split(` `).map(twClass => {

      console.log(`twClass:`, twClass);

      let found = tailwindRules.find(rule => {
        // console.log(`rule.selectorText:`, rule.selectorText);
        return rule.selectorText == `.${twClass}`;
      })

      let property = found.style[found.style.length-1];
      let value = found.style.getPropertyValue(found.style[found.style.length-1]);;

      console.log(`value:`, value);
      
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
      
      console.log(`value:`, value);
      
      if (found) {
        return `${property}: ${value};`;
      } else {
        return ``;
      }
      
    })

    args[1] = styles.join(``);

    console.log(`args[1]:`, args[1]);

    window.console.log.apply(null, args);
    
  } else {
    window.console.log.apply(null, args);
  }
  
}