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



- sudo apt install mariadb-server
- sudo mysql_secure_installation
- sudo mysql -u root -p
- sudo systemctl enable mariadb
- sudo systemctl status mariadb




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
    process VARCHAR(255) COMMENT '工艺类型，包含dispensing,screwing,forming,welding,press',
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


{"role": "user", "content": `\nYou are a natural language to SQL generator that directly outputs SQL statements based on natural language input, no explanation needed.\nThe table name and fields are as follows: CREATE TABLE festo_round_cylinder (
    Stroke VARCHAR(255) COMMENT 'Stroke: 1 mm ... 200 mm',
    PistonDiameter VARCHAR(255) COMMENT 'Piston diameter: 25 mm',
    Cushioning VARCHAR(255) COMMENT 'Cushioning: Elastic cushioning rings/plates at both ends\nSelf-adjusting pneumatic end-position cushioning',
    MountingPosition VARCHAR(255) COMMENT 'Mounting position: optional',
    Design VARCHAR(255) COMMENT 'Design: Piston\nPiston rod\nCylinder barrel',
    PositionDetection VARCHAR(255) COMMENT 'Position detection: Via proximity switch',
    Symbol VARCHAR(255) COMMENT 'Symbol: 00991217',
    Variants VARCHAR(255) COMMENT 'Variants: Metals with copper, zinc or nickel as main constituent are excluded from use. Exceptions are nickel in steel, chemically nickel-plated surfaces, printed circuit boards, cables, electrical plug connectors and coils.\nExtended male piston rod thread\nPiston rod with female thread\nExtended piston rod\nAxial supply port\nSwivel mounting, end cap\nLateral supply port\nMounting thread, end cap\nShortened male piston rod thread',
    OperatingPressureMPa VARCHAR(255) COMMENT 'Operating pressure: 0.06 MPa ... 1 MPa',
    OperatingPressureBar VARCHAR(255) COMMENT 'Operating pressure: 0.6 bar ... 10 bar',
    ModeOfOperation VARCHAR(255) COMMENT 'Mode of operation: Double-acting',
    OperatingMedium VARCHAR(255) COMMENT 'Operating medium: Compressed air to ISO 8573-1:2010 [7:4:4]',
    NoteOnOperatingAndPilotMedium VARCHAR(255) COMMENT 'Note on operating and pilot medium: Lubricated operation possible (in which case lubricated operation will always be required)',
    CorrosionResistanceClassCRC VARCHAR(255) COMMENT 'Corrosion resistance class CRC: 0 - No corrosion stress',
    LABS_PWIS_Conformity VARCHAR(255) COMMENT 'LABS (PWIS) conformity: VDMA24364-B2-L',
    SuitabilityForTheProductionOfLi_ionBatteries VARCHAR(255) COMMENT 'Suitability for the production of Li-ion batteries: Metals with more than 1% by mass of copper, zinc or nickel by mass are excluded from use. Exceptions are nickel in steel, chemically nickel-plated surfaces, printed circuit boards, cables, electrical plug connectors and coils',
    CleanroomClass VARCHAR(255) COMMENT 'Cleanroom class: Class 6 according to ISO 14644-1',
    AmbientTemperature VARCHAR(255) COMMENT 'Ambient temperature: -20 °C ... 80 °C',
    CushioningLength VARCHAR(255) COMMENT 'Cushioning length: 17 mm',
    TheoreticalForceAt0_6MPaReturnStroke VARCHAR(255) COMMENT 'Theoretical force at 0.6 MPa (6 bar, 87 psi), return stroke: 247.4 N',
    TheoreticalForceAt0_6MPaAdvanceStroke VARCHAR(255) COMMENT 'Theoretical force at 0.6 MPa (6 bar, 87 psi), advance stroke: 294.5 N',
    MovingMassFor0mmStroke VARCHAR(255) COMMENT 'Moving mass for 0 mm stroke: 63.6 g',
    AdditionalMovingMassPer10mmStroke VARCHAR(255) COMMENT 'Additional moving mass per 10 mm stroke: 6 g',
    BasicWeightFor0mmStroke VARCHAR(255) COMMENT 'Basic weight for 0 mm stroke: 180.2 g',
    AdditionalWeightPer10mmStroke VARCHAR(255) COMMENT 'Additional weight per 10 mm stroke: 11 g',
    TypeOfMounting VARCHAR(255) COMMENT 'Type of mounting: With accessories',
    PneumaticConnection VARCHAR(255) COMMENT 'Pneumatic connection: G1/8',
    NoteOnMaterials VARCHAR(255) COMMENT 'Note on materials: RoHS-compliant',
    MaterialCover VARCHAR(255) COMMENT 'Material cover: Anodised wrought aluminium alloy',
    MaterialSeals VARCHAR(255) COMMENT 'Material seals: TPE-U(PU)',
    MaterialPistonRod VARCHAR(255) COMMENT 'Material piston rod: High-alloy stainless steel',
    MaterialCylinderBarrel VARCHAR(255) COMMENT 'Material cylinder barrel: High-alloy stainless steel',
    OrderCode VARCHAR(255) COMMENT 'Order code: DSNU-S-25- -F1A-',
    Code VARCHAR(255) COMMENT 'Code 8148789',
    DataSheetLink VARCHAR(255) COMMENT 'Datasheet link: https://www.festo.com/de/en/a/download-document/datasheet/8148789',
    MannualLink VARCHAR(255) COMMENT 'Mannual link: https://www.festo.com/media/pim/046/D15000100152046.PDF',
    ProductLink VARCHAR(255) COMMENT 'https://www.festo.com/de/en/a/8148789',

); \nInput natural language: ${sql}\nOutput SQL:\n`}






```sql


CREATE TABLE festo_round_cylinder (
    Stroke VARCHAR(255) COMMENT 'Stroke: 1 mm ... 200 mm',
    PistonDiameter VARCHAR(255) COMMENT 'Piston diameter: 25 mm',
    Cushioning VARCHAR(255) COMMENT 'Cushioning: Elastic cushioning rings/plates at both ends\nSelf-adjusting pneumatic end-position cushioning',
    MountingPosition VARCHAR(255) COMMENT 'Mounting position: optional',
    Design VARCHAR(255) COMMENT 'Design: Piston\nPiston rod\nCylinder barrel',
    PositionDetection VARCHAR(255) COMMENT 'Position detection: Via proximity switch',
    Symbol VARCHAR(255) COMMENT 'Symbol: 00991217',
    Variants VARCHAR(255) COMMENT 'Variants: Metals with copper, zinc or nickel as main constituent are excluded from use. Exceptions are nickel in steel, chemically nickel-plated surfaces, printed circuit boards, cables, electrical plug connectors and coils.\nExtended male piston rod thread\nPiston rod with female thread\nExtended piston rod\nAxial supply port\nSwivel mounting, end cap\nLateral supply port\nMounting thread, end cap\nShortened male piston rod thread',
    OperatingPressureMPa VARCHAR(255) COMMENT 'Operating pressure: 0.06 MPa ... 1 MPa',
    OperatingPressureBar VARCHAR(255) COMMENT 'Operating pressure: 0.6 bar ... 10 bar',
    ModeOfOperation VARCHAR(255) COMMENT 'Mode of operation: Double-acting',
    OperatingMedium VARCHAR(255) COMMENT 'Operating medium: Compressed air to ISO 8573-1:2010 [7:4:4]',
    NoteOnOperatingAndPilotMedium VARCHAR(255) COMMENT 'Note on operating and pilot medium: Lubricated operation possible (in which case lubricated operation will always be required)',
    CorrosionResistanceClassCRC VARCHAR(255) COMMENT 'Corrosion resistance class CRC: 0 - No corrosion stress',
    LABS_PWIS_Conformity VARCHAR(255) COMMENT 'LABS (PWIS) conformity: VDMA24364-B2-L',
    SuitabilityForTheProductionOfLi_ionBatteries VARCHAR(255) COMMENT 'Suitability for the production of Li-ion batteries: Metals with more than 1% by mass of copper, zinc or nickel by mass are excluded from use. Exceptions are nickel in steel, chemically nickel-plated surfaces, printed circuit boards, cables, electrical plug connectors and coils',
    CleanroomClass VARCHAR(255) COMMENT 'Cleanroom class: Class 6 according to ISO 14644-1',
    AmbientTemperature VARCHAR(255) COMMENT 'Ambient temperature: -20 °C ... 80 °C',
    CushioningLength VARCHAR(255) COMMENT 'Cushioning length: 17 mm',
    TheoreticalForceAt0_6MPaReturnStroke VARCHAR(255) COMMENT 'Theoretical force at 0.6 MPa (6 bar, 87 psi), return stroke: 247.4 N',
    TheoreticalForceAt0_6MPaAdvanceStroke VARCHAR(255) COMMENT 'Theoretical force at 0.6 MPa (6 bar, 87 psi), advance stroke: 294.5 N',
    MovingMassFor0mmStroke VARCHAR(255) COMMENT 'Moving mass for 0 mm stroke: 63.6 g',
    AdditionalMovingMassPer10mmStroke VARCHAR(255) COMMENT 'Additional moving mass per 10 mm stroke: 6 g',
    BasicWeightFor0mmStroke VARCHAR(255) COMMENT 'Basic weight for 0 mm stroke: 180.2 g',
    AdditionalWeightPer10mmStroke VARCHAR(255) COMMENT 'Additional weight per 10 mm stroke: 11 g',
    TypeOfMounting VARCHAR(255) COMMENT 'Type of mounting: With accessories',
    PneumaticConnection VARCHAR(255) COMMENT 'Pneumatic connection: G1/8',
    NoteOnMaterials VARCHAR(255) COMMENT 'Note on materials: RoHS-compliant',
    MaterialCover VARCHAR(255) COMMENT 'Material cover: Anodised wrought aluminium alloy',
    MaterialSeals VARCHAR(255) COMMENT 'Material seals: TPE-U(PU)',
    MaterialPistonRod VARCHAR(255) COMMENT 'Material piston rod: High-alloy stainless steel',
    MaterialCylinderBarrel VARCHAR(255) COMMENT 'Material cylinder barrel: High-alloy stainless steel',
    OrderCode VARCHAR(255) COMMENT 'Order code: DSNU-S-25- -F1A-',
    Code VARCHAR(255) COMMENT 'Code 8148789',
    DataSheetLink VARCHAR(255) COMMENT 'Datasheet link: https://www.festo.com/de/en/a/download-document/datasheet/8148789',
    MannualLink VARCHAR(255) COMMENT 'Mannual link: https://www.festo.com/media/pim/046/D15000100152046.PDF',
    ProductLink VARCHAR(255) COMMENT 'https://www.festo.com/de/en/a/8148789'

);



```


## nvm
- curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.5/install.sh | bash

- export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"

- [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # This loads nvm

nvm install 14.7.0 # or 16.3.0, 12.22.1, etc

nvm use 16
