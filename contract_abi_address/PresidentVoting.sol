// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract PresidentVoting {
    // Structure to define a voter with their registration and voting status
    struct Voter {
        bool isRegistered;      // Indicates if the voter is registered
        bool hasVoted;          // Indicates if the voter has already voted
        uint256 votedProposalId; // The ID of the proposal the voter has voted for
    }

    // Structure to define a proposal with its ID, description, and vote count
    struct Proposal {
        uint256 id;             // Unique identifier for the proposal
        string description;     // A short description of the proposal
        uint256 voteCount;      // Total number of votes the proposal has received
    }

    // State variables
    address public owner;       // The owner of the contract (the person who deployed it)
    bool public votingStarted;  // Flag to track if the voting process has started
    uint256 public proposalCount; // Counter to track the number of proposals
    mapping(address => Voter) public voters; // Mapping of addresses to Voter details
    mapping(uint256 => Proposal) public proposals; // Mapping of proposal IDs to Proposal details
    address[] public voterAddresses;

    // Event declarations for logging certain actions
    event VoterRegistered(address voter);                // Event for registering a voter
    event ProposalAdded(uint256 proposalId, string description); // Event for adding a proposal
    event VoteCasted(address voter, uint256 proposalId);  // Event for casting a vote
    event VotingStarted();                               // Event when voting starts
    event VotingEnded();                                 // Event when voting ends

    // Modifier to restrict function access to the contract owner only
    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can call this function");
        _;
    }

    // Modifier to allow only registered voters to execute a function
    modifier onlyRegisteredVoter() {
        require(voters[msg.sender].isRegistered, "You must be a registered voter");
        _;
    }

    // Modifier to ensure that a function can be called only when voting has not started
    modifier whenVotingNotStarted() {
        require(!votingStarted, "Voting has already started");
        _;
    }

    // Modifier to ensure that a function can be called only when voting has started
    modifier whenVotingStarted() {
        require(votingStarted, "Voting has not started yet");
        _;
    }

    // Constructor function to set the initial owner and initialize state variables
    constructor() {
        owner = msg.sender;     // Set the owner to the address that deployed the contract
        votingStarted = false;  // Initialize voting as not started
        proposalCount = 0;      // Start with no proposals
    }

    // Function for the owner to register a new voter before voting starts
    function registerVoter(address _voter) public onlyOwner whenVotingNotStarted {
        require(!voters[_voter].isRegistered, "Voter is already registered"); // Ensure voter is not already registered
        voters[_voter] = Voter(true, false, 0); // Register the voter with initial values
        voterAddresses.push(_voter);  // Add to array
        emit VoterRegistered(_voter);           // Emit an event to signal voter registration
    }

    // Get voter count
    function getVoterCount() public view returns (uint256) {
        return voterAddresses.length;
    }

    // Get voter by index
    function getVoterByIndex(uint256 index) public view returns (address) {
        require(index < voterAddresses.length, "Index out of bounds.");
        return voterAddresses[index];
    }

    // Function for the owner to add a new proposal before voting starts
    function addProposal(string memory _description) public onlyOwner whenVotingNotStarted {
        proposalCount++;   // Increment the proposal count
        proposals[proposalCount] = Proposal(proposalCount, _description, 0); // Add the new proposal to the proposals mapping
        emit ProposalAdded(proposalCount, _description);  // Emit an event to signal a new proposal
    }

    // Function for the owner to start the voting process
    function startVoting() public onlyOwner whenVotingNotStarted {
        votingStarted = true;    // Set votingStarted flag to true
        emit VotingStarted();    // Emit an event to signal the start of voting
    }

    // Function for the owner to end the voting process
    function endVoting() public onlyOwner whenVotingStarted {
        votingStarted = false;   // Set votingStarted flag to false
        emit VotingEnded();      // Emit an event to signal the end of voting
    }

    // Function for a registered voter to cast their vote for a proposal
    function vote(uint256 _proposalId) public onlyRegisteredVoter whenVotingStarted {
        Voter storage sender = voters[msg.sender];    // Get the voter who is calling this function
        require(!sender.hasVoted, "You have already voted"); // Ensure the voter has not already voted
        require(proposals[_proposalId].id != 0, "Invalid proposal ID"); // Ensure the proposal exists

        sender.hasVoted = true;                      // Mark the voter as having voted
        sender.votedProposalId = _proposalId;        // Record the voted proposal ID
        proposals[_proposalId].voteCount++;          // Increment the vote count for the proposal

        emit VoteCasted(msg.sender, _proposalId);    // Emit an event to signal that a vote was cast
    }

    // Function to get the proposal with the most votes after voting ends
    function getWinningProposal() public view whenVotingNotStarted returns (uint256 winningProposalId) {
        uint256 winningVoteCount = 0;  // Variable to track the highest vote count
        for (uint256 i = 1; i <= proposalCount; i++) { // Iterate over all proposals
            if (proposals[i].voteCount > winningVoteCount) {
                winningVoteCount = proposals[i].voteCount; // Update the highest vote count
                winningProposalId = i;                     // Set the winning proposal ID
            }
        }
    }

    // Function to get the details of a specific proposal by its ID
    function getProposal(uint256 _proposalId) public view returns (uint256 id, string memory description, uint256 voteCount) {
        require(proposals[_proposalId].id != 0, "Invalid proposal ID"); // Ensure the proposal exists
        Proposal memory proposal = proposals[_proposalId]; // Retrieve the proposal from storage
        return (proposal.id, proposal.description, proposal.voteCount); // Return proposal details
    }
}
