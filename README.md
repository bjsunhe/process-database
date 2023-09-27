# process-database


## mysql

https://www.digitalocean.com/community/tutorials/how-to-install-mysql-on-ubuntu-18-04


- sudo apt update

- apt install git

- sudo apt install mysql-server
- sudo mysql_secure_installation


- sudo apt update
- sudo apt install mysql-server
- sudo systemctl start mysql.service
- sudo mysql_secure_installation
- sudo mysql

--- 

SELECT user,authentication_string,plugin,host FROM mysql.user;


ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';


FLUSH PRIVILEGES;

SELECT user,authentication_string,plugin,host FROM mysql.user;

exit

CREATE USER 'sammy'@'localhost' IDENTIFIED BY 'password';

GRANT ALL PRIVILEGES ON *.* TO 'sammy'@'localhost' WITH GRANT OPTION;

exit


## setup mysql

sudo mysql -u root -p
```

CREATE DATABASE your_database_name;

```


```

CREATE USER 'your_username'@'localhost' IDENTIFIED BY 'your_password';
GRANT ALL PRIVILEGES ON your_database_name.* TO 'your_username'@'localhost';
FLUSH PRIVILEGES;

ALTER USER 'username'@'localhost' IDENTIFIED WITH 'mysql_native_password' BY 'new_password';


```

```

CREATE TABLE table_bosch (
    process VARCHAR(255) COMMENT '工艺类型，包含dispensing,screwing,forming,welding四种',
    projectId VARCHAR(255) COMMENT '项目id',
    sap VARCHAR(255) COMMENT 'sap 编号',
    productSizeLength INT COMMENT '产品尺寸（长度）',
    productSizeWidth INT COMMENT '产品尺寸（宽度）',
    productSizeHeight INT COMMENT '产品尺寸（高度）',
    description VARCHAR(255) COMMENT '项目描述',
    supplier VARCHAR(255) COMMENT '供应商',
    press_force INT COMMENT '压力',
    stroke INT COMMENT '行程',
    speed INT COMMENT '速度'
);



```


## nvm
- curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.5/install.sh | bash

- export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"

- [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # This loads nvm

nvm install 14.7.0 # or 16.3.0, 12.22.1, etc

nvm use 16
