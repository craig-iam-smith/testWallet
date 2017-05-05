var SimpleWallet = artifacts.require("./SimpleWallet.sol");

contract('SimpleWallet', function (accounts) {
	it("the owner is allowed to send funds", function() {
		return SimpleWallet.deployed().then(function(myContract) {
			return myContract.isAllowedToSend.call(accounts[0]).then(function(isAllowed) {
				assert.equal(isAllowed, true, 'the owner should have been allowed to send funds');
			});
    	});
	});
	it("the other account should not be allowed to send funds", function() {
		return SimpleWallet.deployed().then(function(myContract) {
			return myContract.isAllowedToSend.call(accounts[2]).then(function(isAllowed) {
				assert.equal(isAllowed, false, 'the other was allowed to send funds');
			});
    	});
	});



	it("checking allow and disallow functions ", function() {
		return SimpleWallet.deployed().then(function(myContract) {
			return myContract.isAllowedToSend.call(accounts[2]).then(function(isAllowed) {
				assert.equal(isAllowed, false, 'the other was allowed to send funds');
			}).then(function() {
				return myContract.allowAddressToSendMoney(accounts[2])
			}).then(function() {
				return myContract.isAllowedToSend.call(accounts[2])
			}).then(function(isAllowed) {
				assert.equal(isAllowed, true, 'the other was allowed to send funds');
			}).then(function() {
				return myContract.disallowAddressToSendMoney(accounts[2])
			}).then(function() {
				return myContract.isAllowedToSend.call(accounts[2])
			}).then(function(isAllowed) {
				assert.equal(isAllowed, false, 'the other was allowed to send funds');
			});
    	});
	});

/*
	it("checking deposit events", function(resolve) {
//		return SimpleWallet.deployed().then(function(meta) {
		var meta = SimpleWallet.deployed();
			var event = meta.Deposit();
			event.watch(function (error, result) {
				if (error) {
					console.err(error);
				} else {
					// now check that the events are correct
					assert.equal(result.event, "Deposit");
					assert.equal(web3.fromWei(result.args.amount.valueOf(), "ether"), 1);
					assert.equal(result.args._sender.valueOf(), web3.eth.accounts[0]);
					event.stopWatching();
					done();
				}
			});
			// send ether
			web3.eth.sendTransaction({from: web3.eth.accounts[0], to: meta.address, value: web3.toWei(1, "ether")});
//		});
	});
	*/
	it(" forbidden deposit events", function(done) {
		var meta = SimpleWallet.deployed();
		web3.eth.sendTransaction({from: web3.eth.accounts[1], to: meta.address, value: web3.toWei(1, "ether")}, function(error, result) {
			if(error) {
				done(error);
			} else {
				done(result);
			}
		});
	});
});

