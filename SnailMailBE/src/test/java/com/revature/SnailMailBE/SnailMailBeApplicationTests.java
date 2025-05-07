package com.revature.SnailMailBE;

import io.restassured.response.Response;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import static io.restassured.RestAssured.given;
import static org.hamcrest.Matchers.*;

@SpringBootTest
class SnailMailBeApplicationTests {

	@Test
	void contextLoads() {
	}

	@Test
	void testGetInbox() {
		Response response = given()
				.when().get("http://localhost:8080/mail")
				.then().extract().response();

		response.then()
				.statusCode(200)
				.body("size()", greaterThan(3))
				.body("[0].recipient", equalTo("me@snailmail.com"))
				.body("[0].sender", equalTo("snail@snailmail.com"))
				.body("[0].subject", equalTo("Hey"))
				.body("[0].body", equalTo("I am a snail"));
	}

}
