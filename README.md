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
)
```

### 6. RouteMapping
```sql
create table RouteMapping(
	route_id int,
	bus_id int,
	primary key (route_id, bus_id),
	FOREIGN KEY (route_id) REFERENCES RouteInfo(route_id) ON DELETE CASCADE,
	FOREIGN KEY (bus_id) REFERENCES BusInfo(bus_id) ON DELETE CASCADE
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


### Static Data

```sql
INSERT INTO BusInfo(bus_name, bus_number, bus_model, bus_origin, bus_destination)
VALUES ('Mumbai Express', 'MH-01-1234', 'Volvo XYZ', 'Mumbai', 'Pune');
INSERT INTO BusInfo(bus_name, bus_number, bus_model, bus_origin, bus_destination)
VALUES ('Shirdi Special', 'MH-02-5678', 'Mercedes ABC', 'Nashik', 'Shirdi');
INSERT INTO BusInfo(bus_name, bus_number, bus_model, bus_origin, bus_destination)
VALUES ('Ellora Explorer', 'MH-03-9012', 'Tata UVW', 'Aurangabad', 'Ellora');
INSERT INTO BusInfo(bus_name, bus_number, bus_model, bus_origin, bus_destination)
VALUES ('Mahabaleshwar Magic', 'MH-04-3456', 'Ashok Leyland PQR', 'Kolhapur', 'Mahabaleshwar');
INSERT INTO BusInfo(bus_name, bus_number, bus_model, bus_origin, bus_destination)
VALUES ('Pandharpur Express', 'MH-05-7890', 'Eicher UVW', 'Solapur', 'Pandharpur');
INSERT INTO BusInfo(bus_name, bus_number, bus_model, bus_origin, bus_destination)
VALUES ('Tadoba Safari', 'MH-06-2345', 'Scania XYZ', 'Nagpur', 'Tadoba');


INSERT INTO RouteInfo(route_name)
VALUES
    ('Lonavala'),
    ('Khandala'),
    ('Kamshet'),
    ('Talegaon'),
    ('Chinchwad'),
    ('Sinnar'),
    ('Vani'),
    ('Igatpuri'),
    ('Ghoti'),
    ('Kopargaon'),
    ('Khuldabad'),
    ('Daulatabad'),
    ('Shendra'),
    ('Shivajinagar'),
    ('Garkheda'),
    ('Karad'),
    ('Satara'),
    ('Wai'),
    ('Panchgani'),
    ('Bhose'),
    ('Akkalkot'),
    ('Barshi'),
    ('Indi'),
    ('Mohol'),
    ('Mangalwedha'),
    ('Umred'),
    ('Bhisi'),
    ('Chandrapur'),
    ('Warora'),
    ('Chimur');


INSERT INTO AdminInfo(admin_user_name, admin_password, admin_full_name, admin_contact_number, admin_dob)
VALUES
    ('admin1', 'password1', 'John Doe', '1234567890', '1990-01-01'),
    ('admin2', 'password2', 'Jane Smith', '2345678901', '1992-05-10'),
    ('admin3', 'password3', 'Michael Johnson', '3456789012', '1985-09-21'),
    ('admin4', 'password4', 'Emily Davis', '4567890123', '1998-12-15'),
    ('admin5', 'password5', 'David Wilson', '5678901234', '1993-07-03');


INSERT INTO DriverInfo(driver_user_name, driver_password, driver_full_name, driver_gender, driver_contact_number, bus_id)
VALUES
    ('driver1', 'password1', 'John Smith', 'Male', '1234567890', 1),
    ('driver2', 'password2', 'Emily Johnson', 'Female', '2345678901', 2),
    ('driver3', 'password3', 'Michael Brown', 'Male', '3456789012', 3),
    ('driver4', 'password4', 'Jessica Davis', 'Female', '4567890123', 4),
    ('driver5', 'password5', 'David Wilson', 'Male', '5678901234', 5),
    ('driver6', 'password6', 'Sophia Miller', 'Female', '6789012345', 6);


INSERT INTO UserInfo(user_full_name, user_gender, user_dob, user_contact_number, user_email, user_password)
VALUES
    ('Alex Johnson', 'Male', '1991-02-15', '1234567890', 'alex@example.com', 'password1'),
    ('Sophie Davis', 'Female', '1993-06-20', '2345678901', 'sophie@example.com', 'password2'),
    ('Benjamin Wilson', 'Male', '1986-09-25', '3456789012', 'benjamin@example.com', 'password3'),
    ('Natalie Anderson', 'Female', '1989-04-10', '4567890123', 'natalie@example.com', 'password4'),
    ('Ethan Martinez', 'Male', '1995-07-05', '5678901234', 'ethan@example.com', 'password5'),
    ('Lily Thompson', 'Female', '1997-11-30', '6789012345', 'lily@example.com', 'password6'),
    ('William Harris', 'Male', '1988-12-12', '7890123456', 'william@example.com', 'password7'),
    ('Grace Miller', 'Female', '1992-05-25', '8901234567', 'grace@example.com', 'password8'),
    ('Henry Jones', 'Male', '1994-09-08', '9012345678', 'henry@example.com', 'password9'),
    ('Chloe Robinson', 'Female', '1998-03-18', '0123456789', 'chloe@example.com', 'password10');


-- Insert data for BusLocation table (intermediate stops)
INSERT INTO BusLocation (longitude, latitude, bus_id, isActive, current_stop)
VALUES
    (72.648101, 18.752287, 1, true, 'Lonavala'),
    (73.754463, 19.750900, 2, true, 'Nashik'),
    (75.888451, 20.067514, 3, true, 'Aurangabad'),
    (75.898413, 19.883699, 4, true, 'Karad'),
    (76.135082, 17.498504, 5, true, 'Akkalkot'),
    (79.301346, 20.842790, 6, true, 'Umred')
    
    
    
    

```