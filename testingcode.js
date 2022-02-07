// var uniqid = require("uniqid");
// var ia="gudang garam"
// console.log(ia.substring(0, 3) + uniqid.process().substring(7, 10))
// console.log(uniqid.process())
var data1=[
   [
    '24',         '1-Jan-21',
     'PT antara1', 'Jakarta',
     'DN0001',     'SKU001',
     '1',          '0001',
    'no',         'no'
  ],
   [
    '24',         '1-Jan-21',
    'PT antara1', 'Jakarta',
     'DN0002',     'SKU002',
    '1',          '0001',
     'no',         'no'
   ],
   [
    '',   '',     '',
    '',   '',     '',
    '',   '0001', 'no',
    'no'
   ]
 ]
 var xlDatcsv2=[];

 for (i = 0; i <= data1.length - 1; i++) {
    if(data1[i].find(element => element === '') ===''){
        console.log("aaaa")
     }else{
         console.log("bbbbaa")
         xlDatcsv2.push(data1[i].concat("a", "no", "no"));
        }
  }
  console.log(xlDatcsv2);
 
 