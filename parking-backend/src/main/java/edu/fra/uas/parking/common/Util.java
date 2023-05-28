package edu.fra.uas.parking.common;

import edu.fra.uas.parking.entity.Privilege;
import edu.fra.uas.parking.entity.Role;

import java.util.ArrayList;
import java.util.List;


public class Util {

    public static List<String> convertRoleToListOfString(List<Role> roles) {
        List<String> authorities = new ArrayList<>();
        for (Role role : roles) {
            for (Privilege privilege : role.getPrivileges()) {
                authorities.add(privilege.getName());
            }
        }
        return authorities;
    }

}
