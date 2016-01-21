
storage模块管理应用本地数据存储区，用于应用数据的保存和读取。



###	索引
***
###	[方法](#方法)：

*	[getLength](#getLength) ：获取应用存储区中保存的键值对的个数
*	[set](#set) ：修改或添加键值(key-value)对数据到应用数据存储中
*	[get](#get) ：通过键(key)检索获取应用存储的值
*	[remove](#remove) ：通过key值删除键值对存储的数据
*	[clear](#clear) ：清除应用所有的键值对存储数据
*	[key](#key) ：获取键值对中指定索引值的key值

***
#	<div id="方法">方法</div>
***

## <div id="getLength"	style="color:red">getLength</div>
-	####	app.storage.getLength()   ⇒ Number
			获取应用存储区中保存的键值对的个数

-	#####	示例：

			var length = app.storage.getLength();

## <div id="set" style="color:red">set</div>
-	####	app.storage.set(key, value)   ⇒ void 
			修改或添加键值(key-value)对数据到应用数据存储中
	-	**key**： 存储的键值
		-	**type**：String
		-	**默认值**：无
	-	**value** ： 存储的内容
		-	**type**：String
		-	**默认值**：无

-	#####	示例：

			app.storage.set('key', 'value')
		
## <div id="get" style="color:red">get</div>
-	####	app.storage.get(key)   ⇒ String 
			通过键(key)检索获取应用存储的值
	-	**key**： 存储的键值
		-	**type**：String
		-	**默认值**：无

-	#####	示例：

			var val = app.storage.get('key');

## <div id="remove" style="color:red">remove</div>
-	####	app.storage.remove(key)   ⇒ void 
			通过key值删除键值对存储的数据
	-	**key**： 存储的键值
		-	**type**：String
		-	**默认值**：无

-	#####	示例：

			app.storage.remove('key');

## <div id="clear" style="color:red">clear</div>
-	####	app.storage.clear()   ⇒ void 
			清除应用所有的键值对存储数据

-	#####	示例：

			app.storage.clear();

## <div id="key" style="color:red">key</div>
-	####	app.storage.key(index)   ⇒ String 
			获取键值对中指定索引值的key值(索引从0开始)
	-	**index**： 存储键值的索引
		-	**type**：Number
		-	**默认值**：无

-	#####	示例：

			var key = app.storage.key(1)
