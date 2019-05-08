    tumSembolsAl();
    varsayilanDevreDisi();

    $(document).ready(function(){

        fiyatimiGuncelle();

        function fiyatimiGuncelle(){
            tumSembolFiyatsAl();
            setTimeout(fiyatimiGuncelle, 2000*1000);
        }

        function tumSembolFiyatsAl(){
            var istem3 = new XMLHttpRequest();
            istem3.open('GET','https://api.binance.com/api/v3/ticker/price',true);
            istem3.onload = function(){
                var sj_benimfiyatim_l = {};
                ourDatax = JSON.parse(istem3.responseText);
                for(k=0;k<ourDatax.length;k++){
                    sj_benimfiyatim_l[ourDatax[k]["symbol"]] = ourDatax[k]["fiyat"];
                }
                sj_benimfiyatim_l =  sj_benimfiyatim_l;
            }
            istem3.send();
        }

        uyariOlus();
        
        function uyariOlus(){
            uyarisOlusturucu();
            setTimeout(uyariOlus, 2*1000);
        }

        function uyarisOlusturucu(){
            $('#tablogoruntule > tbody > tr').each(function(){
                var symbol1 = $(this).find('.gsym').text();
                var symbol = symbol1.substr(1,symbol1.length);
                var uyaricion = $(this).find('.goc').text();
                var pbirimituru = $(this).find('.gparabt').text();
                var uyariSec = $(this).find('.gcond').text();
                var fiyat1 = parseFloat($(this).find('.gfiyat1').text());
                var fiyat2 = parseFloat($(this).find('.gfiyat2').text());
            });
        }

        $(".add-row").click(function(){
            var symbol = $('#pbirimi option:selected').text();
            var uyaricion = $('#uyaricion option:selected').text();
            var pbirimituru = $('#pbirimituru option:selected').text();
            var uyariSec = $('#uyariSec option:selected').text();

            var fiyatusd1 = $('#fiyatusd1').val();
            var fiyatbtc1 = $('#fiyatbtc1').val();
            var fiyatusd2 = $('#fiyatusd2').val();
            var fiyatbtc2 = $('#fiyatbtc2').val();
            var fiyat1,fiyat2;

            if(pbirimituru == 'USDT'){
                if(uyariSec == 'Daha Buyuk' || uyariSec == 'Daha Kucuk'){
                   fiyat1 = fiyatusd1;
                   fiyat2 = '';
                   }
                else{
                   fiyat1 = fiyatusd1;
                   fiyat2 = fiyatusd2;
                }
            }
            else{
                if(uyariSec == 'Daha Buyuk' || uyariSec == 'Daha Kucuk'){
                   fiyat1 = fiyatbtc1;
                   fiyat2 = '';
                   }
                else{
                   fiyat1 = fiyatbtc1;
                   fiyat2 = fiyatbtc2;
                }
            }
            
            var markup = "<tr><td><input type='checkbox' name='kayit'></td><td><span class='gsym'>" + symbol + "</span></td><td><span class='goc'>" + uyaricion + "</span></td><td><span class='gparabt'>" + pbirimituru + "</span></td><td><span class='gcond'>" + uyariSec  + "</span></td><td><span class='gfiyat1'>" + fiyat1 + "</span></td><td><span class='gfiyat2'>" + fiyat2 + "</span></td></tr>";
            $("#tablogoruntule tbody").append(markup);
        });
        
        
        $(".delete-row").click(function(){
            $("#tablogoruntule tbody").find('input[name="kayit"]').each(function(){
            	if($(this).is(":checked")){
                   $(this).parents("tr").remove();
                }
            });
        });
            
        
    });
    function varsayilanDevreDisi(){
        document.getElementById("fiyatbtc1").disabled = true;
        document.getElementById("fiyatusd2").disabled = true;
        document.getElementById("fiyatbtc2").disabled = true;
    }

    function tumSembolsAl(){
        var istem1 = new XMLHttpRequest();
        var url = "https://api.binance.com/api/v3/ticker/price";
        istem1.open('GET', url, true);
        istem1.onload = function (){  
            var ourData = JSON.parse(istem1.responseText);
            var optionsAsString = '';
            for (i=0;i<ourData.length;i++){
                optionsAsString += "<option value='" + ourData[i]["symbol"] + "'>" + ourData[i]["symbol"] + "</option>";
            }    
            $('select[id="pbirimi"]').append(optionsAsString);
        }
        istem1.send();
    }

    function girisDD1(){
            var x1 = document.getElementById("uyariSec").value;
            var x2 = document.getElementById("pbirimituru").value;
            if(x2 == 'USDT'){
               document.getElementById("fiyatbtc1").disabled = true;
               document.getElementById("fiyatusd1").disabled = false;
                if(x1 == 'gte' || x1 == 'lte'){
                    document.getElementById("fiyatbtc2").disabled = true;
                    document.getElementById("fiyatusd2").disabled = true;
                   }
                else{
                    document.getElementById("fiyatbtc2").disabled = true;
                    document.getElementById("fiyatusd2").disabled = false;
                }
                
               }
            else{
                document.getElementById("fiyatusd1").disabled = true;
                document.getElementById("fiyatbtc1").disabled = false;
                
                if(x1 == 'gte' || x1 == 'lte'){
                    document.getElementById("fiyatusd2").disabled = true;
                    document.getElementById("fiyatbtc2").disabled = true;
                }
                else{
                    document.getElementById("fiyatusd2").disabled = true;
                    document.getElementById("fiyatbtc2").disabled = false;
                }
                
            }
        }
    
    function girisDD2(){
        var x1 = document.getElementById("uyariSec").value;
        var x2 = document.getElementById("pbirimituru").value;
        if(x1 == 'gte' || x1 == 'lte'){
           document.getElementById("fiyatbtc2").disabled = true;
           document.getElementById("fiyatusd2").disabled = true;
           }
        else{
            if(x2 == 'USDT'){
               document.getElementById("fiyatusd2").disabled = false;
               }
            else{
               document.getElementById("fiyatbtc2").disabled = false;
            }
        }
    }

    function varsayilanFiyat(){
        var sym = document.getElementById("pbirimi").value;
        
        if(sym.substr(sym.length -4,sym.length) == 'USDT'){
            var istem1 = new XMLHttpRequest();
            var url = "https://api.binance.com/api/v3/ticker/price?symbol=" + sym;
            istem1.open('GET',url,true); 
            istem1.onload = function(){
                ourData = JSON.parse(istem1.responseText);
                document.getElementById("fiyatusd1").value = ourData["fiyat"];
                document.getElementById("fiyatbtc1").value = '';                
            } 
            istem1.send();
         }

        if(sym.substr(sym.length -3,sym.length) == 'BTC' || sym.substr(sym.length -3,sym.length) == 'ETH' || sym.substr(sym.length -3,sym.length) == 'BNB'){
            var istem1 = new XMLHttpRequest();
            var url = "https://api.binance.com/api/v3/ticker/price?symbol=" + sym;
            var np;
            istem1.open('GET',url,true);
            istem1.onload = function(){
                
                ourData = JSON.parse(istem1.responseText);
                document.getElementById("fiyatbtc1").value = ourData["fiyat"];
                np = ourData["fiyat"];

                var istem2 = new XMLHttpRequest();
                var url2 = "https://api.binance.com/api/v3/ticker/price?symbol=" + sym.substr(sym.length -3,sym.length) + "USDT";
                istem2.open('GET',url2,true);
                istem2.onload = function(){
                    ourData2 = JSON.parse(istem2.responseText);
                    document.getElementById("fiyatusd1").value = np*ourData2["fiyat"];
                }
                istem2.send();
            }
            istem1.send();
        }
    }