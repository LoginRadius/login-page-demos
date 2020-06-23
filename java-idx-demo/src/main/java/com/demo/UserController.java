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
public class UserController {

    @Autowired
    LoginRadiusService service;

    @RequestMapping(value="/profile", method={RequestMethod.GET,RequestMethod.POST})
    public String profile(HttpServletRequest request){
        return "profile";
    }

    @RequestMapping(value="/user", method=RequestMethod.GET)
    @ResponseBody
    public String getUserProfile(HttpServletRequest request){
            String result = service.getUserProfile(request);
            System.out.println("UserController.getUserProfile::" + result);
            return result;

    }
    
    @RequestMapping(value="/account", method=RequestMethod.PUT)
    @ResponseBody
    public String accountUpdate(HttpServletRequest request){
       
            String result = service.accountUpdate(request);
            System.out.println("UserController.accountUpdate::" + result);
            return result;
    }


    @RequestMapping(value="/password/change", method=RequestMethod.PUT)
    @ResponseBody
    public String changePassword(HttpServletRequest request){
      
            String result = service.changePassword(request);
            System.out.println("UserController.changePassword::" + result);
            return result;
    }
    
    
    

    @RequestMapping(value="/logout", method=RequestMethod.GET)
    @ResponseBody
    public String logout(HttpServletRequest request){
      
            String result = service.logout(request);
            System.out.println("UserController.logout::" + result);
            return result;
       
    }
}