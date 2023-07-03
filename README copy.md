# Parking Management System

The Parking Management System is a project that aims to provide a comprehensive solution for managing parking lots. It consists of a frontend application built with Angular and a backend application developed using Java Spring Boot. This system utilizes MySQL as the default database for storing parking-related data.

## Features

- User-friendly interface for managing parking lots.
- Efficient parking slot allocation and reservation.
- Real-time monitoring of parking lot occupancy.
- Integrated payment system for seamless transactions.
- Comprehensive reporting and analytics for parking management.

## Prerequisites

Before running the Parking Management System, ensure that the following software is installed:

- Java 17
- NodeJS 18.x.x
- Angular 16.x.x
- MySQL (with connection details available)
- maven

## Installation

1.  Backend Setup:

    - Navigate to the `parking-backend` directory:
      `cd parking-backend`

    - Open the `application.properties` file and provide the necessary MySQL connection details:

    ```
    spring.datasource.url=jdbc:mysql://localhost:3306/parking_db
    spring.datasource.username=root
    spring.datasource.password=password
    ```

1.  Frontend Setup:

    - Navigate to the `parking-frontend` directory:
      `cd parking-frontend`

    - Install the dependencies:
      `npm install`

## Usage

1.  Start the backend server:

    - From the `parking-backend` directory, run the following command:
      `./mvnw spring-boot:run`

1.  Start the frontend application:

    - From the `parking-frontend` directory, run the following command:
      `npm start`

1.  Access the Parking Management System:

    - Open a web browser and visit `http://localhost:4200`.

## Contact

For any inquiries or further information, please contact the project maintainer:

- **Kaddour Alnaasan** (Group leader) - Email: [your.email@example.com](mailto:your.email@example.com)
- Mohammed Dawoud - Email: [your.email@example.com](mailto:your.email@example.com)
- Ebrahim Al Numayri - Email: [your.email@example.com](mailto:your.email@example.com)
- Solomon Obinna Ozoemenam - Email: [your.email@example.com](mailto:your.email@example.com)
- Yazan Jad Mohammad Saad Alsaid - Email: [your.email@example.com](mailto:your.email@example.com)

Thank you for using the Parking Management System!
