/*===============================================================================
************   ui native contacts   ************
===============================================================================*/
;(function($L, global) {

  var AddressBook = function(type) {
    if (type == 1) {
      type = $L.executeConstantJS(['contacts', 'ADDRESSBOOK_SIM'])
    } else {
      type = $L.executeConstantJS(['contacts', 'ADDRESSBOOK_PHONE'])
    }
    this.create = function(success, error) {
      $L.executeNativeJS(['contacts', 'getAddressBook'], type, function(addressbook) {
        if ($L.isFunction(success)) {
          success.call(global, addressbook.create());
        }
      }, function(err) {
        if ($L.isFunction(error)) {
          error.call(global, err);
        }
      });
    };
    this.find = function(findOptions, success, error) {

      $L.executeNativeJS(['contacts', 'getAddressBook'], type, function(addressbook) {
          addressbook.find(function(res) {
              if ($L.isFunction(success)) {
                res = res || []
                success.call(global, res);
              }
            },
            function(err) {
              if ($L.isFunction(error)) {
                error.call(global, err);
              }
            },
            findOptions
          );
        },
        function(err) {
          if ($L.isFunction(error)) {
            error.call(global, err);
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