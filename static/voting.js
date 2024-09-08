let web3;
let account;
let votingContract;
let owner;

const contractAddress = "0xd34259D43DD4197c68D81295f565179979Bd4327"; // Replace with the deployed contract address
const contractABI = [ /* ABI generated from Solidity contract */
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "proposalId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "description",
				"type": "string"
			}
		],
		"name": "ProposalAdded",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "voter",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "proposalId",
				"type": "uint256"
			}
		],
		"name": "VoteCasted",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "voter",
				"type": "address"
			}
		],
		"name": "VoterRegistered",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [],
		"name": "VotingEnded",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [],
		"name": "VotingStarted",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_description",
				"type": "string"
			}
		],
		"name": "addProposal",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "endVoting",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_proposalId",
				"type": "uint256"
			}
		],
		"name": "getProposal",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "description",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "voteCount",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "index",
				"type": "uint256"
			}
		],
		"name": "getVoterByIndex",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getVoterCount",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getWinningProposal",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "winningProposalId",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "proposalCount",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "proposals",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "description",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "voteCount",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_voter",
				"type": "address"
			}
		],
		"name": "registerVoter",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "startVoting",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_proposalId",
				"type": "uint256"
			}
		],
		"name": "vote",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "voterAddresses",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "voters",
		"outputs": [
			{
				"internalType": "bool",
				"name": "isRegistered",
				"type": "bool"
			},
			{
				"internalType": "bool",
				"name": "hasVoted",
				"type": "bool"
			},
			{
				"internalType": "uint256",
				"name": "votedProposalId",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "votingStarted",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];

////

window.onload = async () => {
	if (typeof window.ethereum !== 'undefined') {
		web3 = new Web3(window.ethereum);

		// Request account access
		try {
			const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
			account = accounts[0]; // Get the first account

			// Display connected account
			//document.getElementById('accountStatus').innerText = `Connected Account: ${account}`;

			// Initialize contract
			votingContract = new web3.eth.Contract(contractABI, contractAddress);

			// Check if the user is the owner
			owner = await votingContract.methods.owner().call();
			if (account.toLowerCase() === owner.toLowerCase()) {
				document.getElementById('ownerPanel').style.display = 'block';
				loadProposals(); // Owner sees proposals
				loadVoters();    // Owner sees voters
			} else {
				document.getElementById('nonOwnerPanel').style.display = 'block';
				loadVoterProposals(); // Non-owner sees proposals
				loadVoterVoters();    // Non-owner sees voters
			}

			// Load current voting status
			const votingStarted = await votingContract.methods.votingStarted().call();
			if (votingStarted) {
				// If voting is already started, show the voting interface to everyone
				await loadProposalsForVoting();
				document.getElementById('votingInterface').style.display = 'block'; // Show voting section
			}

			loadVotingStatus();
		} catch (error) {
			console.error("User denied account access or error occurred:", error);
		}
	} else {
		alert('MetaMask not detected. Please install MetaMask to use this DApp.');
	}
};


// Load the current voting status
async function loadVotingStatus() {
	try {
		const votingStarted = await votingContract.methods.votingStarted().call();
		const statusText = votingStarted ? "Ongoing" : "Not Started";
		document.getElementById('votingStatusText').innerText = statusText;

		// Check if the voting has ended (if it's not started and voting has ended)
		if (!votingStarted) {
			const winningProposalId = await votingContract.methods.getWinningProposal().call();
			if (winningProposalId) {
				document.getElementById('displayWinnerSection').style.display = 'block'; // Show winner button for all users
			}
		}
	} catch (error) {
		console.error("Error fetching voting status:", error);
	}
}

// Load all proposals and display them in the list or display a "not ready" message
async function loadProposals() {
	try {
		const proposalCount = await votingContract.methods.proposalCount().call();
		const proposalsTable  = document.getElementById('proposalsTable');
		proposalsTable.innerHTML = ''; // Clear the table

        // Create table headers
        proposalsTable.innerHTML = `
            <tr>
                <th>No.</th>
                <th>Candidate Name</th>
                <th>Votes</th>
            </tr>
        `;


		// If there are no proposals, show a "not ready" message
		if (proposalCount === 0) {
			const message = document.createElement('p');
			message.classList.add('text-danger');
			message.innerText = 'The voting is not ready. Please wait.';
			proposalsTable.appendChild(message);
		} else {
			// Loop through proposals and add them to the list
			for (let i = 1; i <= proposalCount; i++) {
				const proposal = await votingContract.methods.getProposal(i).call();
				const row = `
                    <tr>
                        <td>${proposal.id}</td>
                        <td>${proposal.description}</td>
                        <td>${proposal.voteCount}</td>
                    </tr>
                `;
                proposalsTable.innerHTML += row;
			}
		}
	} catch (error) {
		console.error('Error loading proposals:', error);
	}
}


// Load all registered voters and display them in the list
async function loadVoters() {
	try {
		const votersTable = document.getElementById('votersTable');
		votersTable.innerHTML = ''; // Clear the table

        // Create table headers
        votersTable.innerHTML = `
            <tr>
                <th>Voter's Address</th>
                <th>Registered</th>
                <th>Has Voted</th>
            </tr>
        `;

		// Assuming the contract stores an array of registered voter addresses (you need to replace this with the actual method)
		const voterCount = await votingContract.methods.getVoterCount().call(); // Replace with actual contract method
		for (let i = 0; i < voterCount; i++) {
			const voterAddress = await votingContract.methods.getVoterByIndex(i).call(); // Replace with actual method
			const voter = await votingContract.methods.voters(voterAddress).call();

			// Add voter details as table rows
            const row = `
                <tr>
                    <td>${voterAddress}</td>
                    <td>${voter.isRegistered ? 'Yes' : 'No'}</td>
                    <td>${voter.hasVoted ? 'Yes' : 'No'}</td>
                </tr>
            `;
            votersTable.innerHTML += row;
		}
	} catch (error) {
		console.error('Error loading voters:', error);
	}
}

////
// Load all proposals for non-owners and display them in the list
async function loadVoterProposals() {
	try {
		const proposalCount = await votingContract.methods.proposalCount().call();
		const voterProposalsTable = document.getElementById('voterProposalsTable');
		voterProposalsTable.innerHTML = ''; // Clear the table

        // Create table headers
        voterProposalsTable.innerHTML = `
            <tr>
                <th>No.</th>
                <th>Candidate Name</th>
                <th>Votes</th>
            </tr>
        `;

		// If there are no proposals, show a "not ready" message
		if (proposalCount === 0) {
			const message = document.createElement('p');
			message.classList.add('text-danger');
			message.innerText = 'The voting is not ready. Please wait.';
			voterProposalsTable.appendChild(message);
		} else {
			// Loop through proposals and add them to the list
			for (let i = 1; i <= proposalCount; i++) {
				const proposal = await votingContract.methods.getProposal(i).call();
				const row = `
                    <tr>
                        <td>${proposal.id}</td>
                        <td>${proposal.description}</td>
                        <td>${proposal.voteCount}</td>
                    </tr>
                `;
                voterProposalsTable.innerHTML += row;
			}
		}
	} catch (error) {
		console.error('Error loading proposals for voters:', error);
	}
}

// Load all voters for non-owners and display them in the list
async function loadVoterVoters() {
	try {
		const voterVotersTable = document.getElementById('voterVotersTable');
		voterVotersTable.innerHTML = ''; // Clear the table

        // Create table headers
        voterVotersTable.innerHTML = `
            <tr>
                <th>Voter's Address</th>
                <th>Registered</th>
                <th>Has Voted</th>
            </tr>
        `;

		const voterCount = await votingContract.methods.getVoterCount().call();
		for (let i = 0; i < voterCount; i++) {
			const voterAddress = await votingContract.methods.getVoterByIndex(i).call();
			const voter = await votingContract.methods.voters(voterAddress).call();

			// Add voter details as table rows
            const row = `
                <tr>
                    <td>${voterAddress}</td>
                    <td>${voter.isRegistered ? 'Yes' : 'No'}</td>
                    <td>${voter.hasVoted ? 'Yes' : 'No'}</td>
                </tr>
            `;
            voterVotersTable.innerHTML += row;
		}
	} catch (error) {
		console.error('Error loading voters for non-owners:', error);
	}
}

// Start voting (only owner) and show voting interface
document.getElementById('startVotingButton').addEventListener('click', async () => {
	try {
		await votingContract.methods.startVoting().send({ from: account });
		loadVotingStatus();
		alert('Voting Started!');

		// Load proposals into the voting interface for both owner and non-owner
		await loadProposalsForVoting();
		document.getElementById('votingInterface').style.display = 'block'; // Show voting section
	} catch (error) {
		console.error('Error starting voting:', error);
	}
});





// Consolidated end voting logic
document.getElementById('endVotingButton').addEventListener('click', async () => {
	try {
		await votingContract.methods.endVoting().send({ from: account });
		loadVotingStatus();
		alert('Voting Ended!');

		// Show winner button for everyone
		document.getElementById('displayWinnerSection').style.display = 'block'; // Show winner button
	} catch (error) {
		console.error('Error ending voting:', error);
	}
});


// Add proposal (only owner)
document.getElementById('addProposalButton').addEventListener('click', async () => {
	const description = document.getElementById('proposalDescription').value;
	if (!description) {
		alert('Please enter a valid proposal description.');
		return;
	}
	try {
		await votingContract.methods.addProposal(description).send({ from: account });
		alert('Proposal Added!');
		document.getElementById('proposalDescription').value = '';
		loadProposals();
	} catch (error) {
		console.error('Error adding proposal:', error);
		alert('Failed to add proposal.');
	}
});



// Register a voter (only owner)
document.getElementById('registerVoterButton').addEventListener('click', async () => {
	const voterAddress = document.getElementById('voterAddress').value;
	if (!web3.utils.isAddress(voterAddress)) {
		alert('Please enter a valid Ethereum address.');
		return;
	}
	try {
		await votingContract.methods.registerVoter(voterAddress).send({ from: account });
		alert('Voter Registered!');
		document.getElementById('voterAddress').value = '';
		loadVoters();
	} catch (error) {
		console.error('Error registering voter:', error);
		alert('Failed to register voter.');
	}
});



// Load proposals into the voting interface dropdown
async function loadProposalsForVoting() {
	try {
		const proposalCount = await votingContract.methods.proposalCount().call();
		const proposalSelect = document.getElementById('proposalSelect');
		proposalSelect.innerHTML = ''; // Clear the select options

		// Loop through proposals and add them to the dropdown
		for (let i = 1; i <= proposalCount; i++) {
			const proposal = await votingContract.methods.getProposal(i).call();
			const option = document.createElement('option');
			option.value = proposal.id;
			option.innerText = `ID: ${proposal.id} | ${proposal.description}`;
			proposalSelect.appendChild(option);
		}
	} catch (error) {
		console.error('Error loading proposals for voting:', error);
	}
}

// Handle casting a vote
document.getElementById('castVoteButton').addEventListener('click', async () => {
	const proposalId = document.getElementById('proposalSelect').value;
	if (!proposalId) {
		alert('Please select a proposal to vote for.');
		return;
	}

	try {
		await votingContract.methods.vote(proposalId).send({ from: account });
		alert('Vote Casted Successfully!');
	} catch (error) {
		console.error('Error casting vote:', error);
		alert('Failed to cast vote.');
	}
});


// Show the winning proposal when the owner clicks the button
document.getElementById('showWinnerButton').addEventListener('click', async () => {
	try {
		const winningProposalId = await votingContract.methods.getWinningProposal().call();
		const winningProposal = await votingContract.methods.getProposal(winningProposalId).call();

		//const winningText = `Winning Proposal: ID ${winningProposal.id} | ${winningProposal.description} | Votes: ${winningProposal.voteCount}`;

		// Beautify the output with a congratulatory message
		const winningText = `
				<h4>🎉 Congratulations! 🎉</h4>
				<p><strong>${winningProposal.description}</strong> is the new voted president with a total of <strong>${winningProposal.voteCount} votes</strong>.</p>
				<p>Thank you to everyone who participated in this democratic process. Your votes made a difference!</p>
			`;
		document.getElementById('winningProposalText').innerHTML = winningText;
	} catch (error) {
		console.error('Error fetching winning proposal:', error);
		alert('Failed to load winning proposal.');
	}
});
