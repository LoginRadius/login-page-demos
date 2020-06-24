package com.demo;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
/**
 * Created by LoginRadius Development Team on 09/23/2018
 */
@Controller
public class LoginController {

    @Autowired
    LoginRadiusService service;

    @RequestMapping(value="/", method=RequestMethod.GET)
    public String index(){
        return "index";
    }




   

}
