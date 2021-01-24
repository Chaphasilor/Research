function barcodeCheckdigit(barcodeString) {
  barcodeString = barcodeString.split(' ').join('');
  if (isNaN(parseInt(barcodeString))) throw `You didn't pass a number!`;
  let sum = [...barcodeString].reduce((sum, curr, index) => {
    return sum + (index%2===0 ? 3*parseInt(curr) : parseInt(curr));
  }, 0);
  let checkdigit = sum%10 === 0 ? 0 : 10 - (sum%10);
  return checkdigit;
}

async function printApfel(start, end, static) {

  console.log(`start:`, start);
  console.log(`end:`, end);
  console.log(`static:`, static);

  for (let i = start; i <= end; i++) {
    
    let barcodeData = `${static} ${('00000'+i).slice(-5)}`;

    console.log(`barcodeData:`, barcodeData);

    barcodeData += ' ' + barcodeCheckdigit(barcodeData);

    console.log(barcodeData);
    printQRCode(barcodeData, 1, true);
    await sleep(100);
    
  }
  
}

function sleep(ms) {
  return new Promise((resolve, reject) => {
  
    setTimeout(resolve, ms);
  
  })
}