package com.revature.SnailMailBE;

import com.revature.SnailMailBE.model.Mail;
import com.revature.SnailMailBE.services.MailService;
import io.restassured.response.Response;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

import static io.restassured.RestAssured.given;
import static org.hamcrest.Matchers.*;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
class SnailMailBeApplicationTests {

	@Test
	void contextLoads() {
	}

	//Get Inbox Test with restassured
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

	//send mail test with restassured
	@Test
	void testSendMail() {

		Mail mail = new Mail(
				"yanbd@snailmail.com",
				"snail@snailmail.com",
				"test",
				"this is a restassured test");

		Response response = given()
				.contentType("application/json")
				.body(mail)
				.when().post("http://localhost:8080/mail")
				.then().extract().response();

		response.then()
				.statusCode(200)
				.body("sender", equalTo("yanbd@snailmail.com"))
				.body("recipient", equalTo("snail@snailmail.com"))
				.body("subject", equalTo("test"))
				.body("body", equalTo("this is a restassured test"));
	}

	//send mail fails when missing field(s)
	@Test
	void testSendMailFailsWhenNoRecipient() {
		Mail mail = new Mail(
				"yanbd@snailmail.com",
				"",
				"test",
				"this is a restassured test");

		Response response = given()
				.contentType("application/json")
				.body(mail)
				.when().post("http://localhost:8080/mail")
				.then().extract().response();
		response.then()
				.statusCode(400)
				.body("message", equalTo("Recipient cannot be empty"));
	}

	@Test
	void testSendMailFailsWhenNoSubject() {
		Mail mail = new Mail(
				"yanbd@snailmail.com",
				"snail@snailmail.com",
				"",
				"this is a restassured test");

		Response response = given()
				.contentType("application/json")
				.body(mail)
				.when().post("http://localhost:8080/mail")
				.then().extract().response();
		response.then()
				.statusCode(400)
				.body("message", equalTo("Subject cannot be empty"));
	}

	@Test
	void testSendMailFailsWhenNoBody() {
		Mail mail = new Mail(
				"yanbd@snailmail.com",
				"snail@snailmail.com",
				"test",
				"");

		Response response = given()
				.contentType("application/json")
				.body(mail)
				.when().post("http://localhost:8080/mail")
				.then().extract().response();
		response.then()
				.statusCode(400)
				.body("message", equalTo("Body cannot be empty"));
	}

	//send mail fails when sending to self
	@Test
	void testSendMailFailsWhenRecipientIsSender() {
		Mail mail = new Mail(
				"yanbd@snailmail.com",
				"yanbd@snailmail.com",
				"test",
				"This is a restassured test");

		Response response = given()
				.contentType("application/json")
				.body(mail)
				.when().post("http://localhost:8080/mail")
				.then().extract().response();
		response.then()
				.statusCode(400)
				.body("message", equalTo("You cannot send an email to yourself"));
	}

	//send mail fails when subject is too long
	@Test
	void testSendMailFailsWhenSubjectIsToLong() {
		Mail mail = new Mail(
				"yanbd@snailmail.com",
				"snail@snailmail.com",
				"ABCDEFGHIJKLMNOPQRSTUVWXYZ",
				"This is a restassured test");

		Response response = given()
				.contentType("application/json")
				.body(mail)
				.when().post("http://localhost:8080/mail")
				.then().extract().response();
		response.then()
				.statusCode(400)
				.body("message", equalTo("Subject may not exceed 20 characters"));
	}

	@Test
	void testSendMailFailsWhenRecipientEmailIsInvalid() {
		Mail mail = new Mail(
				"yanbd@snailmail.com",
				"snailsnailmail.com",
				"test",
				"This is a restassured test");

		Response response = given()
				.contentType("application/json")
				.body(mail)
				.when().post("http://localhost:8080/mail")
				.then().extract().response();
		response.then()
				.statusCode(400)
				.body("message", equalTo("Please enter a valid email address"));
	}

	@Test
	void testSendMailFailsWhenRecipientEmailIsInvalid2() {
		Mail mail = new Mail(
				"yanbd@snailmail.com",
				"snail@snailmail",
				"test",
				"This is a restassured test");

		Response response = given()
				.contentType("application/json")
				.body(mail)
				.when().post("http://localhost:8080/mail")
				.then().extract().response();
		response.then()
				.statusCode(400)
				.body("message", equalTo("Please enter a valid email address"));
	}


	@MockitoBean
	private MailService mockMailService;

	@Autowired
	private MockMvc mockMvc;

	@Test
	void returnsNoContentIfInboxIsEmpty() throws Exception {
		when(mockMailService.getInbox()).thenReturn(null);

		mockMvc.perform(get("/mail"))
				.andExpect(status().isNoContent())
				.andExpect(content().string(""));

}
}
