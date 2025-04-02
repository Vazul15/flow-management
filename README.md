# Flow Management - Management.. Attendance, Analytics, and More!

## Description
Flow Management is a web application designed to simplify the management of students and teachers for educational institutions. With this app, you can track student attendance, manage profiles, and generate reports to analyze absences efficiently.

Developed by:
- [![vazulmagyar][vazulmagyar]][vazulmagyar-url]

## Used Technologies

- Frontend:
  - [![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://reactjs.org/)
  - [![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-38B2AC?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
  - [![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)

- Backend:
  - [![Spring Boot](https://img.shields.io/badge/Spring%20Boot-6DB33F?style=for-the-badge&logo=springboot&logoColor=white)](https://spring.io/projects/spring-boot)
  - [![Spring Web MVC](https://img.shields.io/badge/Spring%20Web%20MVC-6DB33F?style=for-the-badge&logo=spring&logoColor=white)](https://spring.io/guides/gs/serving-web-content/)
  - [![Spring Data JPA](https://img.shields.io/badge/Spring%20Data%20JPA-6DB33F?style=for-the-badge&logo=spring&logoColor=white)](https://spring.io/projects/spring-data-jpa)
  - [![Spring Security](https://img.shields.io/badge/Spring%20Security-6DB33F?style=for-the-badge&logo=springsecurity&logoColor=white)](https://spring.io/projects/spring-security)
  - [![Hibernate](https://img.shields.io/badge/Hibernate-59666C?style=for-the-badge&logo=hibernate&logoColor=white)](https://hibernate.org/)

- Database:
  - [![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)

- Containerization:
  - [![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)](https://www.docker.com/)

---

## Demo Images
### Group Manager Page - Attendance
![Screenshot](https://github.com/Vazul15/flow-management/blob/07569035e79e779bfdf5a9b835648c9e09d3c6ec/readMeImages/Screenshot%202025-04-02%20171209.png)
### Admin Management Page - Edit Group / Add schedules
![Screenshot](https://github.com/Vazul15/flow-management/blob/07569035e79e779bfdf5a9b835648c9e09d3c6ec/readMeImages/Screenshot%202025-04-02%20150352.png)
### Admin Management Page - All Students Table
![Screenshot](https://github.com/Vazul15/flow-management/blob/07569035e79e779bfdf5a9b835648c9e09d3c6ec/readMeImages/Screenshot%202025-04-02%20150245.png)
### Admin Management Page - Create Student
![Screenshot](https://github.com/Vazul15/flow-management/blob/07569035e79e779bfdf5a9b835648c9e09d3c6ec/readMeImages/Screenshot%202025-04-02%20161454.png)
### Admin Management Page - Statistics
![Screenshot](https://github.com/Vazul15/flow-management/blob/07569035e79e779bfdf5a9b835648c9e09d3c6ec/readMeImages/Screenshot%202025-04-02%20171321.png)



## Features

## Technical Features
  - The application is containerized using Docker.
  - Docker Compose manages multi-container setups, including the PostgreSQL database.
  - Running with Docker Compose eliminates the need to manually create the database or configure environment variables locally.
  - Built with Vite-React and Material Tailwind for a responsive and dynamic user interface.
  - RESTful API integration for smooth data exchange between frontend and backend.
  - Client-side routing with React Router for multiple pages.
  - Authorization: Secures endpoints to authenticated users.
    
## UI/UX Features
  - Instant feedback with toast notifications.
  - Fully accessible components.
  - Consistent design system using shadcn/ui.
  - Loading states and animations.

## Features for Admin
  - Teacher Registration and Authentication: Built with Spring Security and JWT tokens for secure access control.
  - Teacher Invitation: Admins can invite teachers to sign up. The system sends an email with a randomly generated password for first-time login.
  - Role-Based Access Control: Differentiates between user and admin roles, ensuring functionality is tailored to user permissions.
  - Attendance Analytics and Tracking: Allows admins to monitor and analyze attendance data effectively.

## Features for Teachers
  - Student Management: Teachers can add or remove students from their assigned groups.
  - Attendance Management: Enables teachers to manage student attendance records efficiently.

## Getting Started

### Prerequisites
To run this project, ensure the following tools are installed:
- [![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)](https://www.docker.com/)
- [![Java](https://img.shields.io/badge/Java-007396?style=for-the-badge&logo=java&logoColor=white)](https://www.java.com/)
- [![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
- [![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
- [![NPM](https://img.shields.io/badge/NPM-CB3837?style=for-the-badge&logo=npm&logoColor=white)](https://www.npmjs.com/)

### Installation

#### Running the Project with Docker
1. Clone the repository from GitHub:
   ```bash
   git clone https://github.com/Vazul15/flow-management.git
   cd flow-management
   
2. Build and start the Docker containers:
   ```bash
    docker-compose up --build
    ```
3. Set environment variables in `.env.example`:
   
   ```bash
   # Database configuration
    POSTGRES_USER=<your_database_user>
    POSTGRES_PASSWORD=<your_database_password>
    POSTGRES_DB=<your_database_name>

   # Backend configuration
    DATASOURCE_URL=jdbc:postgresql://db:5432/<your_database_name>
    DATASOURCE_USERNAME=<your_database_user>
    DATASOURCE_PASSWORD=<your_database_password>

   # JWT configuration
    JWT_SECRET=<your_jwt_secret>
    JWT_EXPIRATION_MS=<jwt_expiration_time>

   # Spring Mail configuration
    SPRING_MAIL_HOST=smtp.gmail.com
    SPRING_MAIL_PORT=587
    SPRING_MAIL_USERNAME=my_email@gmail.com
    SPRING_MAIL_PASSWORD=my_email_password_or_app_specific_password
    SPRING_MAIL_SMTP_AUTH=true
    SPRING_MAIL_STARTTLS_ENABLE=true
    SPRING_MAIL_STARTTLS_REQUIRED=true
   ```
   
   *The JWT secret key should be 64 characters long and should only include alphanumeric characters (A-Z, a-z, 0-9). It is advisable to avoid using special characters such as `-`, `/`, `+`, and `=` to prevent potential issues with encryption and encoding. You can generate one on this website: https://asecuritysite.com/encryption/plain*

3. Rename `.env.example` to `.env`:
   ```
   mv .env.example .env
   ```

4. Build and start the containers:
   ```bash
   docker compose up --build
   ```

   *Docker will automatically set up the database and run the backend and frontend services.*


[vazulmagyar]: https://img.shields.io/badge/Vazul%20Magyar-181717?style=for-the-badge&logo=github&logoColor=white
[vazulmagyar-url]: https://github.com/Vazul15
