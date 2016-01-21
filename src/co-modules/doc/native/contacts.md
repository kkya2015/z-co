
Contacts模块管理系统通讯录，用于可对系统通讯录进行增、删、改、查等操作。


###	索引
***
###	[方法](#方法)：

*	[getAddressBook](#getAddressBook) ：获取通讯录对象

###	[对象](#对象)：

*	[AddressBook](#AddressBook) ：通讯录对象
	-	方法
		-	[create](#create) ：创建联系人
		-	[find](#find) ：在通讯录中查找联系人

*	[Contact](#Contact) ：联系人对象
	-	属性
		-	[displayName](#displayName) ：联系人显示的名字（仅可读）
		-	[name](#name) ：联系人名称
		-	[nickname](#nickname) ：联系人的昵称
		-	[phoneNumbers](#phoneNumbers) ：联系人的电话
		-	[emails](#emails) ：联系人的邮箱
		-	[addresses](#addresses) ： 联系人的地址
		-	[organizations](#organizations) ： 联系人的地址
		-	[note](#note) ：联系人的备注
	-	方法
		-	[save](#save) ：保存联系人
		-	[remove](#remove) ：删除联系人

***
#	<div id="方法">方法</div>
***

## <div id="getAddressBook" style="color:red">getAddressBook</div>
-	####	app.contacts.getAddressBook([type])   ⇒ [Contact](#Contact) 
			根据指定通讯录类型获取通讯录对象，获取通讯录对象后可对其进行增、删、改操作。
	-	**type**：要获取的通讯录类型,可取通讯录类型常量，可获取手机通讯录或SIM卡通讯录。
		-	**type**：Number
		-	**默认值**：0
		-	**取值范围**
			-	0：手机通讯录
			-	1：SIM卡通讯录(Android设备，iOS设备暂不支持sim卡)
	
-	#####	示例：

			var addressBook = app.contacts.getAddressBook(1)

***
#	<div id="对象">对象</div>
***

##	<div id="AddressBook" style="color:red">AddressBook</div>

		var addressBook = app.contacts.getAddressBook()
	
-	#### <div id="create" style="color:red">create(success, [error])   ⇒ void </div>   
			创建一个系统联系人，并通过回调函数返回联系人对象，可对联系人对象进行操作设置联系人信息，如名称、地址、电话等。
	-	**success**：创建联系人操作成功回调函数
		-	**type**：function
		-	**默认值**：无
		-	**参数**
			-	[Contact](#Contact)：联系人对象
				-	type：Objcet
	-	**error**：创建联系人操作失败回调
		-	**type**：function
		-	**默认值**：无
		-	**参数**
			-	**err**：创建联系人操作失败信息
				-	**type**：String

-	#####	示例：

			var addressBook = app.contacts.getAddressBook()

			EX - 1：
			addressBook.create(function(contact) {
			    console.log(contact);
			});
			
			EX - 2：
			addressBook.create(function(contact) {
			    console.log(contact);
			}, function(err) {
			    console.log('isError');
			});

-	#### <div id="find" style="color:red">find(options, success, [error])   ⇒ void </div>   
			在通讯录中查找联系人
	-	**options** ：查找联系人参数
		-	**type**：JSON
		-	**默认值**：无
		-	**keys**
			-	**name**：( String )姓名关键字
				-	**默认值**：无
	-	**success**：查找联系人操作成功的回调函数。
		-	**type**：function
		-	**默认值**：无
		-	**参数**
			-	**contacts**：查找到的联系人对象数组([Contact](#Contact))
				-	**type**：Array
	-	**error**：查找联系人操作失败的回调函数。
		-	**type**：function
		-	**默认值**：无
		-	**参数**
			-	**err**：查找联系人操作失败的信息
				-	**type**：String

-	#####	示例：

			var addressBook = app.contacts.getAddressBook()

			EX - 1：
			addressBook.find({
			    name: '李四'
			}, function(contacts) {
			    console.log(contacts);
			});
			
			EX - 2：
			addressBook.find({
			    name: '李四'
			}, function(contacts) {
			    console.log(contacts);
			}, function(err) {
			    console.log(err);
			});

##	<div id="Contact" style="color:red">Contact</div>

		var addressBook = app.contacts.getAddressBook()
		addressBook.create(function(contact) {
		    console.log(contact);
		});

-	###	属性

-	#### <div id="displayName" style="color:green">displayName </div>   
			联系人显示的名字（仅可读）
	-	**type**：String

-	#####	示例：

			var addressBook = app.contacts.getAddressBook()
			addressBook.create(function(contact) {
			    console.log(contact.displayName);
			});
	
	
-	#### <div id="name" style="color:green">name </div>   
			联系人名称
	-	**type**：JSON
	-	**keys**
		-	**familyName**：( *String* )联系人的姓
		-	**givenName**：( *String* )联系人的名
		-	**middleName**：( *String* )联系人的中间名
		-	**honorificPrefix**：( *String* )联系人的前缀（如Mr.或Dr.）
		-	**honorificSuffix**：( *String* )联系人的后缀

-	#####	示例：

			var addressBook = app.contacts.getAddressBook()
			addressBook.create(function(contact) {
			    console.log(contact.name.familyName);
			});
	
-	#### <div id="nickname" style="color:green">nickname </div>   
				联系人的昵称
	-	**type**：String
	-	**默认值**：无

-	#####	示例：

			var addressBook = app.contacts.getAddressBook()
			addressBook.create(function(contact) {
			    console.log(contact.nickname);
			});
	
-	#### <div id="phoneNumbers" style="color:green">phoneNumbers([PhoneNumber](#PhoneNumber)) </div>   
			联系人的电话
	-	**type**：Array([PhoneNumber](#PhoneNumber))
	-	**默认值**：无
		-	**<div id="PhoneNumber">PhoneNumber </div>** 
			-	**type**：JSON
			-	**keys**
				-	**type**：( *String* )联系人电话类型，如电话号码中的“mobile”表示移动电话、“main”表示主要联系方式
				-	**value**：( *String* )电话号码

-	#####	示例：

			var addressBook = app.contacts.getAddressBook()
			addressBook.create(function(contact) {
			    console.log(contact.phoneNumbers[0].value);
			});
	
-	#### <div id="emails" style="color:green">emails([Email](#Email)) </div>   
			联系人的邮箱
	-	**type**：Array([Email](#Email))
	-	**默认值**：无
		-	**<div id="Email">Email </div>** 
			-	**type**：JSON
			-	**默认值**：无
			-	**keys**
				-	**type**：( *String* )联系人邮箱类型，如电话号码中的“home”表示个人邮箱、“work”表示工作邮箱、空值表示为其他
				-	**value**：( *String* )邮箱地址

-	#####	示例：

			var addressBook = app.contacts.getAddressBook()
			addressBook.create(function(contact) {
			    console.log(contact.emails[0].value);
			});
	
-	#### <div id="addresses" style="color:green">addresses([address](#address)) </div>   
			联系人的地址
	-	**type**：Array([address](#address))
	-	**默认值**：无
		-	**<div id="address">address </div>** 
			-	**type**：JSON
			-	**keys**
				-	**type**：( *String* )联系人地址类型，如“home”表示家庭地址，“work”表示工作地址，值为空或其他字段时表示 显示地址为——其他
				-	**streetAddress**：( *String* )街道地址
				-	**locality**：( *String* )城市或地区
				-	**region**：( *String* )省或地区
				-	**country**：( *String* )国家
				-	**postalCode**：( *String* )邮政编码


-	#####	示例：

			var addressBook = app.contacts.getAddressBook()
			addressBook.create(function(contact) {
			    console.log(contact.address[0].type);
			});
	
-	#### <div id="organizations" style="color:green">organizations([organization](#organization)) </div>   
			  	联系人所属组织信息
	-	**type**：Array([organization](#organization))
	-	**默认值**：无
		-	**<div id="organization">organization </div>** 
			-	**type**：JSON
			-	**keys**
				-	**name**：( *String* )联系人所属组织名称
				-	**department**：( *String* )联系人所属组织名称
				-	**title**：( *String* )联系人在组织中的职位

-	#####	示例：

			var addressBook = app.contacts.getAddressBook()
			addressBook.create(function(contact) {
			    console.log(contact.organizations[0].name);
			});
	
-	#### <div id="note" style="color:green">note </div>   
			联系人的备注
	-	**type**：String
	-	**默认值**：无
		
-	#####	示例：
			var addressBook = app.contacts.getAddressBook()
			addressBook.create(function(contact) {
			    console.log(contact.organizations[0].name);
			});
		
-	###	方法
-	#### <div id="save" style="color:red">save(success, error)   ⇒ void </div>   
			将联系人数据保存到通讯录中，操作成功将调用success回调函数，操作失败将通过通过error回调函数返回错误信息。
	-	**success**：添加联系人操作成功回调
		-	**type**：function
		-	**默认值**：无
	-	**error**：添加联系人操作失败回调
		-	**type**：function
		-	**默认值**：无
		-	**参数**
			-	**err**：添加联系人操作失败信息
				-	**type**：String

-	#####	示例：
			var addressBook = app.contacts.getAddressBook()

			addressBook.create(function(contact) {
			    contact.name = {
			        givenName: "名字",
			        familyName: "姓氏"
			    };
			    contact.save(function() {
			        console.log('Save Success!');
			    }, function(err) {
			        console.log(err);
			    })
			});
	
-	#### <div id="remove" style="color:red">remove(success, error)   ⇒ void </div>   
			删除联系人，操作成功将调用success回调函数，操作失败将通过通过error回调函数返回错误信息。
	-	**success**：删除联系人操作成功回调
		-	**type**：function
		-	**默认值**：无
	-	**error**：删除联系人操作失败回调
		-	**type**：function
		-	**默认值**：无
		-	**参数**
			-	**err**：添加联系人操作失败信息
				-	**type**：String

-	#####	示例：

			var addressBook = app.contacts.getAddressBook()

			addressBook.find({
			    name: '李四'
			}, function(contacts) {
			    var contact = contacts[0]
			    contact.remove(function() {
			        console.log('Remove Success!');
			    }, function(err) {
			        console.log(err);
			    })
			});
