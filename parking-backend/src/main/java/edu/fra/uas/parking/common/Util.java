package edu.fra.uas.parking.common;

import edu.fra.uas.parking.entity.Privilege;
import edu.fra.uas.parking.entity.Role;

import java.util.HashSet;
import java.util.Set;


public class Util {

    public static Set<String> convertRoleToSetOfString(Set<Role> roles) {
        Set<String> authorities = new HashSet<>();
        for (Role role : roles) {
            for (Privilege privilege : role.getPrivileges()) {
                authorities.add(privilege.getName());
            }
        }
        return authorities;
    }

}
