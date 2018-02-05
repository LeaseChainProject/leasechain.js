pragma solidity ^0.4.18;

/*
  # Unit Contract

   - Add all leases associated with this unit to this contract

  ## Methods
    - add lease
    - terminate lease
*/

contract Lease {
    struct Tenant {
        address addr;
        string name;
        string email;
        uint256 leaseSignDate;
    }

    uint256 constant weiPerEther = 1000000000000000000;

    address propertyManager;
    string description;
    uint256 rentalInterval;
    uint256 rentalAmount;

    mapping (address => Tenant) public tenants;
    mapping (address => bool) public leaseSigned;
    mapping (address => bool) public leaseApplicants;
    address[] public tenantList;


    /* Events */
    event LeaseApplicantAdded(
      address indexed _leaseApplicant
    );
    event LeaseSigned(
      address indexed _tenant,
      string _name,
      uint256 _signdate
    );

    function Lease(uint256 _rentalInterval, uint256 _rentalAmount) public {
        propertyManager = msg.sender;
        rentalInterval = _rentalInterval;
        rentalAmount = _rentalAmount;
    }

    // Valid lease applicants are added to this list
    function addApplicant(address _leaseApplicant) public {
      leaseApplicants[_leaseApplicant] = true;
      LeaseApplicantAdded(_leaseApplicant);
    }

    function signLease(string _name, string _email)
      public
      isIn(leaseApplicants)
      payable
      {
        Tenant memory _tenant = Tenant({
            addr: msg.sender,
            name: _name,
            email: _email,
            leaseSignDate: now
        });
        tenantList.push(_tenant.addr) ;
        tenants[_tenant.addr] = _tenant;
        LeaseSigned(_tenant.addr, _name, _tenant.leaseSignDate);
    }

    modifier isIn(mapping (address => bool) _arr) {
      require(_arr[msg.sender] == true);
      _;
    }

    modifier byOnly(address _account) {
        require(msg.sender == _account);
        _;
    }

    function getTenant(address _tenantAddress) internal constant returns (Tenant) {
        return tenants[_tenantAddress];
    }
}
