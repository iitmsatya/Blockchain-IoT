
    console.log("Entered init");
    var rpc = null;
    var eth = null;
    var totalTransaction = [];
    var data = null;
    var maxBlockNo = null;
	var tx = null;
	var dateTime = null;
	var counter = 0;
    rpc = new Web3(new Web3.providers.HttpProvider("http://172.16.10.179:8545"));
    
    if(rpc !=null && rpc!= undefined && rpc!=""){

        if (rpc.isConnected())
            console.log("Connected to Blockchain network !!");
        else                        
            console.log("Cannot connect to Blockchain network :(");                         
    }


    maxBlockNo = rpc.eth.blockNumber;
    for (var i=0; i < maxBlockNo; i++) {
        data = rpc.eth.getBlock(maxBlockNo - i);
        
		if((data.transactions != null && data.transactions != [] && data.transactions !="") && (counter<=10)){
			
            for (var j=0; j < 10; j++) {
				if(data.transactions[j] != null && data.transactions[j] != [] && data.transactions[j] !=""){
				
					tx = rpc.eth.getTransaction(data.transactions[j]);
					dateTime = new Date(data.timestamp * 1000);
				
            		totalTransaction.push({

                		ledgerTimestamp : dateTime,
                		ledgerBlockNo : data.number,
                		ledgerMiner : data.miner,
                		ledgerNonce : data.nonce,

               		 	//transactionId : data.transactions[i],
               		 	//transactionDetails : data.transactions[0],
            
						fromAccount : tx.from,
						toAccount : tx.to
					})
				}
            }
			counter++;
			//console.log(data.transactions[0]);
			//tx = rpc.eth.getTransaction(data.transactions[0]);
			//console.log((data.timestamp));
		}
    }

    // $this.totalTransaction = totalTransaction; 
    pushToHtml();

    function pushToHtml(){
                        
        var row ="";
        var deviceName="";
        for(var i = 0; i < totalTransaction.length; i++){
            //console.log(totalTransaction[i].ledgerBlockNo);

            row += "<TR id=\"transactionRow\" class=\"matrix_row_light\">";
            row += "<TD>"+totalTransaction[i].ledgerTimestamp+"</TD>";
            row += "<TD>"+totalTransaction[i].ledgerBlockNo+"</TD>";
            row += "<TD>"+"Smart TV"+"</TD>";
			row += "<TD>"+getEntityName(totalTransaction[i].fromAccount)+"</TD>";
            row += "<TD>"+getEntityName(totalTransaction[i].toAccount)+"</TD>";

            row += "</TR>";
            //console.log(row);
        }
        var table = "<TBODY>"+
          "<TR>"+
            "<TH width=\"150\" style=\"background: #2881e6;\" scope=\"col\" text-color:\"white\">Date & Time</TH>"+
            "<TH width=\"60\" style=\"background: #2881e6;\" scope=\"col\" text-color:\"white\">Block Number</TH>"+
            "<TH width=\"100\" style=\"background: #2881e6;\" scope=\"col\" white\"=\"\">Device Name</TH>"+
            "<TH width=\"100\" style=\"background: #2881e6;\" scope=\"col\" white\"=\"\">From</TH>"+
			"<TH width=\"100\" style=\"background: #2881e6;\" scope=\"col\" white\"=\"\">To</TH>"+
          "</TR>";
        table += row;
        table +="</TBODY>";
        $("#table").html(table);;
        
    }

    function getEntityName(accountHash){
        var entityName="";
        if(accountHash =="0x0f2f5224e9bbc350888ad821ed25592af78d657e"){                 
            entityName="IoT";
        }else if(accountHash =="0x6b00837fc281bd2815aa195b015aacad98213d8d"){
            entityName="Surveyor";
        }else if(accountHash =="0xb0ce88228d307989f9d97ab471bdf946ad1c593e"){
            entityName="Insurer";
        }else if(accountHash =="0x0551a57818838d135b1a0c0f854bd36e63eea25b"){
            entityName="Bank";
        }else if(accountHash =="xxx"){
            entityName="Regulator";
        }else{
            entityName="Test";
        }
        return entityName;
    }

    function stepOne(){
        console.log("----- inside stepOne");
        var fromDevice = "123456789";//rpc.eth.accounts[0];
        var comment = "Claim Initiated";
        
		
		rpc.personal.unlockAccount('0x0f2f5224e9bbc350888ad821ed25592af78d657e', "testing");         
        rpc.eth.sendTransaction({ from: '0x0f2f5224e9bbc350888ad821ed25592af78d657e', to: '0x6b00837fc281bd2815aa195b015aacad98213d8d', value:1});
        
		//rpc.personal.unlockAccount(fromAccount, "testing");

        //rpc.personal.unlockAccount(fromAccount, "testing");           
        //rpc.eth.sendTransaction({ from:fromDevice, to:comment });
        //$scope.msg="Transaction initiated successfully!";
		console.log("----- exiting stepOne");
    }

    function stepTwo(){
        console.log("----- inside stepTwo");        
        rpc.personal.unlockAccount('0x6b00837fc281bd2815aa195b015aacad98213d8d', "testing");         
        rpc.eth.sendTransaction({ from: '0x6b00837fc281bd2815aa195b015aacad98213d8d', to: '0xb0ce88228d307989f9d97ab471bdf946ad1c593e', value:1});
    }
	
	
    function stepThree(){
        console.log("----- inside stepThree");        
        rpc.personal.unlockAccount('0xb0ce88228d307989f9d97ab471bdf946ad1c593e', "testing");         
        console.log("----- after unlock"); 
		rpc.eth.sendTransaction({ from: '0xb0ce88228d307989f9d97ab471bdf946ad1c593e', to: '0x0551a57818838d135b1a0c0f854bd36e63eea25b', value:1});
    }
	
	function getip(json) {
        var ip = json.ip;
        return ip;
    }

    /*$scope.triggerEvent=function(){
        var fromDevice = "123456789";//rpc.eth.accounts[0];
        var comment = "Claim Initiated";
        
        rpc.personal.unlockAccount(rpc.eth.accounts[0], "testing");         
        rpc.eth.sendTransaction({ from: rpc.eth.accounts[0], to: rpc.eth.accounts[1], value:1000});
        //rpc.personal.unlockAccount(fromAccount, "testing");

        //rpc.personal.unlockAccount(fromAccount, "testing");           
        //rpc.eth.sendTransaction({ from:fromDevice, to:comment });
        $scope.msg="Transaction initiated successfully!";

    }


    $scope.macIDs=function(accountHash){
        var deviceName="";
        if(accountHash =="0x0f2f5224e9bbc350888ad821ed25592af78d657e"){                 
            deviceName="Raspberry IoT";
        }else if(accountHash =="0x754b8a8fcc17cf07dfbfb00628b27390184a761b"){
            deviceName="Smart Mirror";
        }else{
            deviceName="Test";
        }
        return deviceName;
    }*/








