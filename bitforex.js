var gv_allsymprice = {};    
var alert1 = document.getElementById("myAudio"); 
   
   $(document).ready(function(){
       
       getallsymbolsbit();
       defaultdisablesbit();
       
       
          
   
       updatesympricesbit();

       function updatesympricesbit(){
           getallsymbolspricesbit();
           setTimeout(updatesympricesbit,2*1000);
       }
       
       
       function getallsymbolspricesbit(){
           var ourRequestx = new XMLHttpRequest();
           ourRequestx.open('GET','https://api.binance.com/api/v3/ticker/price',true);
           ourRequestx.onload = function (){
               var gv_allsymprice_l = {};
               ourDatax = JSON.parse(ourRequestx.responseText);
               for(k=0;k<ourDatax.length;k++){
                   gv_allsymprice_l[ourDatax[k]["symbol"]] = ourDatax[k]["price"];
               }
               gv_allsymprice = gv_allsymprice_l;
           }
           ourRequestx.send();
       }
       
       genalerts();
       
       function genalerts(){
           generatealerts();
           setTimeout(genalerts,2*1000);
       }
       
       function generatealerts(){
           $("#dptable > tbody > tr").each(function(){
               var symbol1 = $(this).find('.dpsym').text();
               var symbol = symbol1.substr(1,symbol1.length);//remove leading spaces
               var alerton = $(this).find('.dpaon').text();
               var currencytype = $(this).find('.dpcurtype').text();
               var alertoptions = $(this).find('.dpcond').text();
               var price1 = parseFloat($(this).find('.dpprice1').text());
               var price2 = parseFloat($(this).find('.dpprice2').text());
               
               
               var fp1,fp2,fp;
               if(currencytype == 'USDT'){
                  if(symbol.substr(symbol.length - 4, symbol.length) == 'USDT'){
                    fp1 = gv_allsymprice[symbol];
                    fp2 = 1;
                    }
                   else{
                    fp1 = gv_allsymprice[symbol];
                    fp2 = gv_allsymprice[symbol.substr(symbol.length - 3, symbol.length) + 'USDT'];
                   }
                  }
               else{
                  if(symbol.substr(symbol.length - 4, symbol.length) == 'USDT'){
                    fp1 = gv_allsymprice[symbol];
                    fp2 = 1;
                    }
                   else{
                    fp1 = 1;
                    fp2 = gv_allsymprice[symbol.substr(symbol.length - 3, symbol.length) + 'USDT'];
                   }
                  }
               
               fp = fp1*fp2;
               
               
               if(!price2){
                       if(alertoptions == 'Greater Than'){
                           if(fp >= price1){
                              alert1.play();
                              alert('Price of ' + symbol + ' is greater than ' + price1);
                              }
                       }
                       else{
                           if(fp <= price1){
                              alert1.play();
                              alert('Price of ' + symbol + ' is less than ' + price1);
                              }
                       }

                  }
               else{
                      if(alertoptions == 'Inside Channel'){
                           if(fp >= price1 && fp <= price2){
                              alert1.play();
                              alert('Price of ' + symbol + ' is Inside channel ' + price1 + ' & ' + price2);
                              }
                       }
                       else{
                           if(fp <= price1 || fp >= price2){
                              alert1.play();
                              alert('Price of ' + symbol + ' is Outside channel ' + price1 + ' & ' + price2);
                              }
                       }

               }
                   
           });
       }
       
       $(".add-row").click(function(){
           var symbol = $("#currencybit option:selected").text();
           var alerton = $("#alertOn option:selected").text();
           var currencytype = $("#currencytype option:selected").val();
           var alertoptions = $("#alertoptions option:selected").text();
           var priceusd1 = $("#priceusd1").val();
           var pricebtc1 = $("#pricebtc1").val();
           var priceusd2 = $("#priceusd2").val();
           var pricebtc2 = $("#pricebtc2").val();
           var price1,price2;
           if(currencytype == 'USDT'){
               if(alertoptions == 'Greater Than' || alertoptions == 'Less Than'){
                  price1 = priceusd1;
                  price2 = '';
                  }
               else{
                  price1 = priceusd1;
                  price2 = priceusd2;
               }
           }
           else{
               if(alertoptions == 'Greater Than' || alertoptions == 'Less Than'){
                  price1 = pricebtc1;
                  price2 = '';
                  }
               else{
                  price1 = pricebtc1;
                  price2 = pricebtc2;
               }
           }
           
           var markup = "<tr><td><input type='checkbox' name='record'></td><td>" +'<span class="dpsym"> ' + symbol + '</span></td><td><span class="dpaon">' + alerton + '</span></td><td><span class="dpcurtype">' + currencytype + '</span></td><td><span class="dpcond">' + alertoptions  + '</span></td><td><span class="dpprice1">' + price1 + '</span></td><td><span class="dpprice2">' + price2 + "</span></td></tr>";
           $("#dptable tbody").append(markup);
       });
       
       // Find and remove selected table rows
       $(".delete-row").click(function(){
           $("#dptable tbody").find('input[name="record"]').each(function(){
               if($(this).is(":checked")){
                   $(this).parents("tr").remove();
               }
           });
       });
           
       
   });
   
   function defaultdisablesbit(){
       document.getElementById("pricebtc1").disabled = true;
       document.getElementById("priceusd2").disabled = true;
       document.getElementById("pricebtc2").disabled = true;
   }
   
   function disableInputs1(){
           var x1 = document.getElementById("alertoptions").value;
           var x2 = document.getElementById("currencytype").value;
           if(x2 == 'USDT'){
              document.getElementById("pricebtc1").disabled = true;
              document.getElementById("priceusd1").disabled = false;
               if(x1 == 'gte' || x1 == 'lte'){
                   document.getElementById("pricebtc2").disabled = true;
                   document.getElementById("priceusd2").disabled = true;
                  }
               else{
                   document.getElementById("pricebtc2").disabled = true;
                   document.getElementById("priceusd2").disabled = false;
               }
               
              }
           else{
               document.getElementById("priceusd1").disabled = true;
               document.getElementById("pricebtc1").disabled = false;
               
               if(x1 == 'gte' || x1 == 'lte'){
                   document.getElementById("priceusd2").disabled = true;
                   document.getElementById("pricebtc2").disabled = true;
               }
               else{
                   document.getElementById("priceusd2").disabled = true;
                   document.getElementById("pricebtc2").disabled = false;
               }
               
           }
       }
   
   function disableInputs2(){
       var x1 = document.getElementById("alertoptions").value;
       var x2 = document.getElementById("currencytype").value;
       if(x1 == 'gte' || x1 == 'lte'){
          document.getElementById("pricebtc2").disabled = true;
          document.getElementById("priceusd2").disabled = true;
          }
       else{
           if(x2 == 'USDT'){
              document.getElementById("priceusd2").disabled = false;
              }
           else{
              document.getElementById("pricebtc2").disabled = false;
           }
       }
   }
   
   function getallsymbolsbit(){
       var ourRequest1 = new XMLHttpRequest();
       var url = 'https://api.bitforex.com/api/v1/trade/placeOrder';
       ourRequest1.open('GET',url,true);
       ourRequest1.onload = function (){  
           ourData = JSON.parse(ourRequest1.responseText);
           //gv_symbols = gv_symbols.concat(ourData);
           var optionsAsString = '';
           //document.getElementById('currentprice').value = ourData[0]["price"];
           for (i=0;i<ourData.length;i++){
               optionsAsString += "<option value='" + ourData[i]["symbol"] + "'>" + ourData[i]["symbol"] + "</option>";
           }    
           $('select[name="currencybit"]' ).append( optionsAsString );
       }
       ourRequest1.send();
   }
   
   function defaultPricesbit(){
       var sym = document.getElementById("currencybit").value;
       if(sym.substr(sym.length - 4, sym.length) == 'USDT'){
          var ourRequest1 = new XMLHttpRequest();
          var url = 'https://api.bitforex.com/api/v1/trade/placeOrder?symbol='+sym;
          ourRequest1.open('GET',url,true); 
          ourRequest1.onload = function(){
              ourData = JSON.parse(ourRequest1.responseText);
              document.getElementById("priceusd1").value = ourData["price"];
              document.getElementById("pricebtc1").value = '';
              
          } 
          ourRequest1.send();
       }
       
       if(sym.substr(sym.length - 3, sym.length) == 'BTC'){
          var ourRequest1 = new XMLHttpRequest();
          var url = 'https://api.binance.com/api/v3/ticker/price?symbol='+sym;
          var np,up;
          ourRequest1.open('GET',url,true); 
          ourRequest1.onload = function(){
              ourData = JSON.parse(ourRequest1.responseText);
              document.getElementById("pricebtc1").value = ourData["price"];
              np = ourData["price"];
              
              //Call Second REST API
              var ourRequest2 = new XMLHttpRequest();
              ourRequest2.open('GET','https://api.binance.com/api/v3/ticker/price?symbol=BTCUSDT',true);
              ourRequest2.onload = function(){
                  ourData2 = JSON.parse(ourRequest2.responseText);
                  document.getElementById("priceusd1").value = np*ourData2["price"];
              }
              ourRequest2.send();
          } 
          ourRequest1.send();
       }
       
       if(sym.substr(sym.length - 3, sym.length) == 'ETH'){
          var ourRequest1 = new XMLHttpRequest();
          var url = 'https://api.binance.com/api/v3/ticker/price?symbol='+sym;
          var np,up;
          ourRequest1.open('GET',url,true); 
          ourRequest1.onload = function(){
              ourData = JSON.parse(ourRequest1.responseText);
              document.getElementById("pricebtc1").value = ourData["price"];
              np = ourData["price"];
              
              //Call Second REST API
              var ourRequest2 = new XMLHttpRequest();
              ourRequest2.open('GET','https://api.binance.com/api/v3/ticker/price?symbol=ETHUSDT',true);
              ourRequest2.onload = function(){
                  ourData2 = JSON.parse(ourRequest2.responseText);
                  document.getElementById("priceusd1").value = np*ourData2["price"];
              }
              ourRequest2.send();
          } 
          ourRequest1.send();
       }
       
       if(sym.substr(sym.length - 3, sym.length) == 'BNB'){
          var ourRequest1 = new XMLHttpRequest();
          var url = 'https://api.binance.com/api/v3/ticker/price?symbol='+sym;
          var np,up;
          ourRequest1.open('GET',url,true); 
          ourRequest1.onload = function(){
              ourData = JSON.parse(ourRequest1.responseText);
              document.getElementById("pricebtc1").value = ourData["price"];
              np = ourData["price"];
              
              //Call Second REST API
              var ourRequest2 = new XMLHttpRequest();
              ourRequest2.open('GET','https://api.binance.com/api/v3/ticker/price?symbol=BNBUSDT',true);
              ourRequest2.onload = function(){
                  ourData2 = JSON.parse(ourRequest2.responseText);
                  document.getElementById("priceusd1").value = np*ourData2["price"];
              }
              ourRequest2.send();
          } 
          ourRequest1.send();
       }
   }