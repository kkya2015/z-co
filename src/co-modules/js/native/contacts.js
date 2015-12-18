/*===============================================================================
************   ui native contacts   ************
===============================================================================*/
(function($L, global) {

  var AddressBook = function(type) {
    if (type == 1) {
      type = $L.executeConstantJS(['contacts', 'ADDRESSBOOK_SIM'])
    } else {
      type = $L.executeConstantJS(['contacts', 'ADDRESSBOOK_PHONE'])
    }
    this.create = function(success, error) {
      $L.executeNativeJS(['contacts', 'getAddressBook'], type, function(addressbook) {
        if ($L.isFunction(success)) {
          success.call(null, addressbook.create());
        }
      }, function(err) {
        if ($L.isFunction(error)) {
          error.call(null, err);
        }
      });
    };
    this.find = function(findOptions, success, error) {

      $L.executeNativeJS(['contacts', 'getAddressBook'], type, function(addressbook) {
          addressbook.find(function(res) {
              if ($L.isFunction(success)) {
                res = res || []
                success.call(null, res);
              }
            },
            function(err) {
              if ($L.isFunction(error)) {
                error.call(null, err);
              }
            },
            findOptions
          );
        },
        function(err) {
          if ($L.isFunction(error)) {
            error.call(null, err);
          }
        }
      );
    }

  }

  $L.contacts = {
    getAddressBook: function(type) {
      if (type != 1) {
        type = 0
      }
      return new AddressBook(type)
    }
  }

}(app, this));