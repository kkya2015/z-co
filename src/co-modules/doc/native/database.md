# database
***
数据库 通过数据库对象可以进行一般的数据库操作，比如增、删、改、查以及事务等基本操作。



###索引
***
###[方法](#方法)：

*	[open](#open) ：打开一个dataBase，获得一个dataBase对象。

###[对象](#对象)：

*	[DataBase](#DataBase) ：数据库对象
	-	方法
		-	[executeSql](#executeSql) ：执行某一个Sql语句。
		-	[close](#close) ：关闭数据库。
		-	[deleteDataBase](#deleteDataBase) ：删除数据库。
		-	[selectAll](#selectAll) ：查找所有符合条件的数据。
		-	[beginTransaction](#beginTransaction) ：开始事务。
		-	[commit](#commit) ：提交事务。
		-	[rollback](#rollback) ：提交事务。

***
#<div id="方法">方法</div>
***

## <div id="open">open</div>
-	####app.database.open(databaseName)   ⇒ [DataBase](#DataBase) 
		打开一个dataBase，获得一个dataBase对象，若存在此对象，则直接返回；若不存在，则创建一个新的dataBase。
	-	databaseName：支持名字(在默认路径创建数据库)和协议路径(请参照协议路径)
		-	type：String
		-	默认值：无
#####示例：
	var dataBase = rd.dataBase.open('dababaseName');

***
#<div id="对象">对象</div>
***

##<div id="DataBase">DataBase</div>

	var dataBase = rd.dataBase.open('dababaseName');
	
-	#### <div id="executeSql">executeSql(sql)   ⇒ Number </div>   
		执行某一个Sql语句，比如建表、插入、删除、修改等语句。成功返回 1， 失败返回 0。
	-	sql：要执行的Sql语句。
		-	type：String
		-	默认值：无
	-	####示例：
			var dataBase = rd.dataBase.open('dababaseName');

			var flag = dataBase.executeSql('CREATE TABLE IF NOT EXISTS t_students (id integer PRIMARY KEY AUTOINCREMENT,name text,age integer,number DOUBLE,buer BOOL)');

			if (flag == 1) {
			    console.log('执行成功');
			}

-	#### <div id="close">close()   ⇒ Number </div>   
		关闭数据库。成功返回 1， 失败返回 0。
	-	####示例：
			var dataBase = rd.dataBase.open('dababaseName');

			var flag = dataBase.close()；

			if (flag == 1) {
			    console.log('关闭成功');
			}

-	#### <div id="deleteDataBase">deleteDataBase()   ⇒ Number </div>   
		删除数据库。成功返回 1， 失败返回 0。
	-	####示例：
			var dataBase = rd.dataBase.open('dababaseName');

			var flag = dataBase.deleteDataBase()；

			if (flag == 1) {
			    console.log('删除成功');
			}

-	#### <div id="selectAll">selectAll(sql)   ⇒ Array </div>   
		查找所有符合条件的数据。返回值为包含表字段的JSON对象组成的数组
	-	sql：要执行的Sql语句。
		-	type：String
		-	默认值：无
	-	####示例：
			var dataBase = rd.dataBase.open('dababaseName');

			var res = dataBase.selectAll('select * from t_students');

			if (res.length == >0) {
			    console.log(res[0].name);
			}

-	#### <div id="beginTransaction">beginTransaction()   ⇒ void </div>   
		开始事务。
	-	####示例：
			var dataBase = rd.dataBase.open('dababaseName');

			dataBase.beginTransaction()；

-	#### <div id="commit">commit()   ⇒ void </div>   
		提交事务。
	-	####示例：
			var dataBase = rd.dataBase.open('dababaseName');

			dataBase.commit()；

-	#### <div id="rollback">rollback()   ⇒ void </div>   
		提交事务。
	-	####示例：
			var dataBase = rd.dataBase.open('dababaseName');

			dataBase.rollback()；