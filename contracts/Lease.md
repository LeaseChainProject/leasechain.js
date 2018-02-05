  Structure of Lease Contract

  ## Data Members
  
  Lease Owner
    - name
    - addr
  Lease Broker
  Tenants
    - name
    - addr
    - email
    - leaseSignDate
    - lastPaymentDate

  Rent
    - rent price
    - interval

  Rented unit
    - unit addr
    - unit size

  ## Methods

  - Add tenant
  - remove tenant
  - sign lease (by tenants)
  - terminate lease (required by all tenants)
  - pay rent
      : has to be paid for each month. so time tracking is required.
  - isLeaseActive? (have as modifier)
      : if all tenants listed in the lease sign it, then the lease becomes active
       and queries on the lease can be made
  - isRentPaid? (for that month)
  - list tenants
  - isTenant
      : to check if an addr is the tenant of this property and if the lease is active
        to be used as proof by 3rd parties

  Event
    - tenant signed lease
    - lease has become active (one time event)
    - rent paid

  (requires tenant screening contract)
  

  ## Requirements
   - Lease self destructs if not signed in 30 days
   - send event for rent payment after every 30 days


  ## Questions
   - figure out clock in ethereum
