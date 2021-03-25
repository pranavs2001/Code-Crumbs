package com.example.codecrumbsbackend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

import java.io.File;

@SpringBootApplication
@EnableSwagger2
public class CodecrumbsBackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(CodecrumbsBackendApplication.class, args);
	}

}
