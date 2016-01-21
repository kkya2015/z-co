/*===============================================================================
************   ui native database   ************
===============================================================================*/
;(function($L, global) {


	var dataBaseObj = function(databaseName) {
		var dataBase = $L.executeNativeJS(['dataBase', 'open'], databaseName);

		/*
		 * 执行某一个Sql语句。
		 * @param sql : 必选 要执行的Sql语句,例如：'CREATE TABLE IF NOT EXISTS t_students (id integer PRIMARY KEY AUTOINCREMENT,name text,age integer,number DOUBLE,buer BOOL)'
		 * @return flag : 成功：1 , 失败：0
		 */
		this.executeSql = function(sql) {
			if (typeof sql === undefined) {
				throw new Error("请传入有效的sql语句！");
			}
			return $L.executeObjFunJS([dataBase, 'executeSql'], sql);
		}

		/*
		 * 关闭数据库。
		 */
		this.close = function() {
			return $L.executeObjFunJS([dataBase, 'close']);
		}

		/*
		 * 删除数据库。
		 */
		this.deleteDataBase = function() {
			return $L.executeObjFunJS([dataBase, 'deleteDataBase']);
		}

		/*
		 * 查找所有符合条件的数据。
		 * @param sql :要执行的Sql语句,例如：'select * from t_students'
		 */
		this.selectAll = function(sql) {
			if (typeof sql === undefined) {
				throw new Error("请传入有效的sql语句！");
			}
			return $L.executeObjFunJS([dataBase, 'selectAll'], sql);
		}

		/*
		 * 开始事务。
		 */
		this.beginTransaction = function() {
			$L.executeObjFunJS([dataBase, 'beginTransaction']);
		}

		/*
		 * 提交事务。
		 */
		this.commit = function() {
			$L.executeObjFunJS([dataBase, 'commit']);
		}

		/*
		 * 事务回滚。
		 */
		this.rollback = function() {
			$L.executeObjFunJS([dataBase, 'rollback']);
		}
	}


	$L.dataBase = {
		/*
		 * 打开一个dataBase，获得一个dataBase对象，若存在此对象，则直接返回；若不存在，则创建一个新的dataBase。
		 * @param databaseName : (String) : 必选 支持名字(在默认路径创建数据库)和协议路径(请参照以下的协议路径)
		 	res : 程序资源路径，相当于app目录
			data : 用户自定义数据路径，相当于数据目录
			cache : 缓存路径
			cpts : components路径，相当于component所在的上级目录
			cpt : 当前component所在的路径
		 * @return DataBase : 数据库对象
		 */
		open: function(databaseName) {
			return new dataBaseObj(databaseName);
		}
	}

}(app, this));