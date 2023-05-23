# Bus Tracking System




## Database

### 1. Admin Info
```sql
CREATE TABLE AdminInfo(
	admin_id SERIAL PRIMARY KEY,
	admin_user_name varchar(20) not null,
	admin_password varchar(100) not null,
	admin_full_name varchar(50) not null,
	admin_contact_number varchar(10) not null,
	admin_dob DATE not null
)
```

### 2. Bus Info
```sql
CREATE TABLE BusInfo(
	bus_id SERIAL PRIMARY KEY,
	bus_name varchar(50) not null,
	bus_number varchar(20) not null,
	bus_model varchar(40) not null,
	bus_origin varchar(20) not null,
	bus_destination varchar(20) not null	
)
```

### 3. Route Info
```sql
CREATE TABLE RouteInfo(
	route_id SERIAL PRIMARY KEY,
	route_name varchar(40) not null,
	bus_id int REFERENCES BusInfo(bus_id) ON DELETE CASCADE
)
```

### 4. Driver Info
```sql
CREATE TABLE DriverInfo(
	driver_id SERIAL PRIMARY KEY,
	driver_user_name varchar(20) not null,
	driver_password varchar(100) not null,
	driver_full_name varchar(50) not null,
	driver_gender VARCHAR(6) not null,
    driver_contact_number VARCHAR(10) not null,
	bus_id INT REFERENCES BusInfo(bus_id)
)
```

### 5. User Info
```sql
CREATE TABLE UserInfo(
	user_id SERIAL PRIMARY KEY,
	user_user_name varchar(20) not null,
	user_password varchar(100) not null,
	user_full_name varchar(50) not null,
    user_contact_number varchar(10) not null,
 	user_gender VARCHAR(6) not null,
    user_dob DATE not null,
    user_profile_pic varchar(50) 
)
```

### 6. BusLocation
```sql
CREATE TABLE BusLocation (
    bus_id INT primary key REFERENCES BusInfo(bus_id) ,
    latitude FLOAT NOT NULL,
    longitude FLOAT NOT NULL,
    timestamp TIMESTAMP DEFAULT NOW(),
	isActive boolean default false
);
```