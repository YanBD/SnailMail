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
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;

@SpringBootTest
@AutoConfigureMockMvc
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
				.when().post("http://localhost:8080/mail/send")
				.then().extract().response();
	}


	@MockitoBean
	private MailService mockMailService;

	@Autowired
	private MockMvc mockMvc;

	@Test void returnsNoContentIfInboxIsEmpty() throws Exception {
		when(mockMailService.getInbox()).thenReturn(null);

		mockMvc.perform(get("/mail"))
				.andExpect(status().isNoContent())
				.andExpect(content().string(""));

}
}
