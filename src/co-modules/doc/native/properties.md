# properties
***
自定义属性，properties为键值存取器，可以存储用户的自定义属性。其中properties文件夹包含一级文件夹(domain)，存取文件".properties"为后缀的文件


###	索引
***
###	[方法](#方法)：

*	[open](#open) ：打开一个property

###	[对象](#对象)：

*	[Property](#Property) ：property对象
	-	方法
		-	[put](#put) ：设置属性值
		-	[get](#get) ：结束录音操作
		-	[delete](#delete)：删除属性值
		-	[clean](#clean)：清除所有属性
		-	[save](#save)：清除所有属性

***
#	<div id="方法">方法</div>
***

## <div id="open" style="color:red">open</div>
-	####	app.properties.open(domain, fileName)   ⇒ [Property](#Property)
			如果property文件不存在，新建相应的property，如果存在，直接读取
	-	**domain**： 一级文件夹
		-	**type**：String
		-	**默认值**：无
	-	**fileName**： 文件名
		-	**type**：String
		-	**默认值**：无

-	#####	示例：

			var property = app.properties.open('domain','fileName')


***
#	<div id="对象">对象</div>
***

##	<div id="Property" style="color:red">Property</div>

		var property = app.properties.open('domain','fileName')
	
-	#### <div id="put" style="color:red">put(key, value)   ⇒ void </div>   
			设置属性值
	-	**key**： 键值
		-	**type**：String
		-	**默认值**：无
	-	**value**： 属性值
		-	**type：**String
		-	**默认值**：无

-	#####	示例：

			var property = app.properties.open('domain','fileName')
			property.put('key', 'value')

-	#### <div id="get" style="color:red">get(key)   ⇒ String </div>   
			获取属性值
	-	**key**： 键值
		-	**type**：String
		-	**默认值**：无

-	#####	示例：

			var property = app.properties.open('domain','fileName')
			var val = property.get('key')

-	#### <div id="delete" style="color:red">delete(key)   ⇒ void </div>   
			删除属性值
	-	**key**： 键值
		-	**type**：String
		-	**默认值**：无

-	#####	示例：

			var property = app.properties.open('domain','fileName')
			property.delete('key')

-	#### <div id="clean" style="color:red">clean()   ⇒ void </div>   
			清除所有属性

-	#####	示例：

			var property = app.properties.open('domain','fileName')
			property.clean()

-	#### <div id="save" style="color:red">save()   ⇒ void </div>   
			保存操作

-	#####	示例：

			var property = app.properties.open('domain','fileName')
			property.save()