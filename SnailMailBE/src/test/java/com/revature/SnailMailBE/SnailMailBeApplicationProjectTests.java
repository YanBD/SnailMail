package com.revature.SnailMailBE;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.revature.SnailMailBE.model.Mail;
import com.revature.SnailMailBE.model.PasswordDTO;
import com.revature.SnailMailBE.model.User;
import com.revature.SnailMailBE.services.MailService;
import io.restassured.response.Response;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

import static io.restassured.RestAssured.given;
import static org.hamcrest.Matchers.equalTo;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
public class SnailMailBeApplicationProjectTests {

    //Test 1.Password changes successfully
    @Test
    void changePassword() {
        PasswordDTO passwordDTO = new PasswordDTO(
                "mail",
                "password",
                "change"
        );

        Response response = given()
                .contentType("application/json")
                .body(passwordDTO)
                .when().patch("http://localhost:8080/auth")
                .then().extract().response();
        response.then()
                .statusCode(200);
    }

    //Test 2.password fails when current password is incorrect
    @Test
    void changePasswordFailsWhenCurrentIsWrong() {
        PasswordDTO passwordDTO = new PasswordDTO(
                "mail",
                "passwor",
                "change"
        );
        Response response = given()
                .contentType("application/json")
                .body(passwordDTO)
                .when().patch("http://localhost:8080/auth")
                .then().extract().response();
        response.then()
                .statusCode(400)
                .body("message", equalTo("Current password is incorrect"));
    }

    //Test 3.Ensure that login method behaves correctly when unsuccessful login
    @Test
    void loginFunctionFails() {
        User user = new User();
        user.setUsername("yanbd");
        user.setPassword("passwor");

        Response response = given()
                .contentType("application/json")
                .body(user)
                .when().post("http://localhost:8080/auth/login")
                .then().extract().response();
        response.then()
                .statusCode(400)
                .body("message", equalTo("Invalid username or password"));
    }

    //Use mocking (mockito + mockMVC) to ensure that the sendMail() method behaves appropriately
    @MockitoBean
    private MailService mockMailService;

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    void sendMailPerformsAsExpectedUsingMock() throws Exception {
        Mail mail = new Mail(
                "yanbd@snailmail.com",
                "snail@snailmail.com",
                "Test",
                "This test originated from rest assured"
        );
        //TODO: figure this crap out
        when(mockMailService.sendMail(any(Mail.class))).thenReturn(mail);

        mockMvc.perform(post("/mail").content(objectMapper.writeValueAsString(mail))
                .contentType(MediaType.APPLICATION_JSON).accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(content().json(objectMapper.writeValueAsString(mail)));
    }
}
