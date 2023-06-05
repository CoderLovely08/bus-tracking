CREATE TABLE "BusLocation"(
    "bus_id" INTEGER NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,
    "isActive" BOOLEAN NOT NULL,
    "current_stop" VARCHAR(255) NOT NULL
);
ALTER TABLE
    "BusLocation" ADD PRIMARY KEY("bus_id");
CREATE TABLE "DriverInfo"(
    "driver_id" SERIAL NOT NULL,
    "driver_user_name" VARCHAR(255) NOT NULL,
    "driver_password" VARCHAR(255) NOT NULL,
    "driver_full_name" VARCHAR(255) NOT NULL,
    "driver_gender" VARCHAR(255) NOT NULL,
    "driver_contact_number" VARCHAR(255) NOT NULL,
    "bus_id" INTEGER NOT NULL
);
ALTER TABLE
    "DriverInfo" ADD PRIMARY KEY("driver_id");
CREATE TABLE "UserInfo"(
    "user_id" SERIAL NOT NULL,
    "user_name" VARCHAR(255) NOT NULL,
    "user_password" VARCHAR(255) NOT NULL,
    "user_full_name" VARCHAR(255) NOT NULL,
    "user_dob" DATE NOT NULL,
    "user_contact_number" VARCHAR(255) NOT NULL,
    "user_profile_picture" VARCHAR(255) NOT NULL,
    "user_gender" VARCHAR(255) NOT NULL
);
ALTER TABLE
    "UserInfo" ADD PRIMARY KEY("user_id");
CREATE TABLE "AdminInfo"(
    "admin_id" SERIAL NOT NULL,
    "admin_user_name" VARCHAR(255) NOT NULL,
    "admin_password" VARCHAR(255) NOT NULL,
    "admin_full_name" VARCHAR(255) NOT NULL,
    "admin_contact_number" VARCHAR(255) NOT NULL,
    "admin_dob" DATE NOT NULL
);
ALTER TABLE
    "AdminInfo" ADD PRIMARY KEY("admin_id");
CREATE TABLE "RouteInfo"(
    "route_id" SERIAL NOT NULL,
    "route_name" VARCHAR(255) NOT NULL
);
ALTER TABLE
    "RouteInfo" ADD PRIMARY KEY("route_id");
CREATE TABLE "RouteMapping"(
    "route_id" INTEGER NOT NULL,
    "bus_id" INTEGER NOT NULL
);
ALTER TABLE
    "RouteMapping" ADD PRIMARY KEY("route_id");
CREATE TABLE "BusInfo"(
    "bus_id" INTEGER NOT NULL,
    "bus_name" VARCHAR(255) NOT NULL,
    "bus_number" INTEGER NOT NULL,
    "bus_model" VARCHAR(255) NOT NULL,
    "bus_origin" VARCHAR(255) NOT NULL,
    "bus_destination" VARCHAR(255) NOT NULL
);
ALTER TABLE
    "BusInfo" ADD PRIMARY KEY("bus_id");
ALTER TABLE
    "DriverInfo" ADD CONSTRAINT "driverinfo_bus_id_foreign" FOREIGN KEY("bus_id") REFERENCES "BusInfo"("bus_id");
ALTER TABLE
    "RouteMapping" ADD CONSTRAINT "routemapping_bus_id_foreign" FOREIGN KEY("bus_id") REFERENCES "BusInfo"("bus_id");
ALTER TABLE
    "BusLocation" ADD CONSTRAINT "buslocation_bus_id_foreign" FOREIGN KEY("bus_id") REFERENCES "BusInfo"("bus_id");
ALTER TABLE
    "RouteMapping" ADD CONSTRAINT "routemapping_route_id_foreign" FOREIGN KEY("route_id") REFERENCES "RouteInfo"("route_id");