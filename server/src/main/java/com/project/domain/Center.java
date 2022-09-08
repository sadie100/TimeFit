package com.project.domain;

import com.vladmihalcea.hibernate.type.json.JsonType;
import lombok.*;
import org.hibernate.annotations.TypeDef;

import javax.persistence.*;
import java.util.Set;

@Builder
@Entity  //데이터베이스에 사용될 entity를 정의
@Getter  //getter 자동 선언
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PUBLIC)  //인자없는 생성자를 자동 생성
@TypeDef(name = "json", typeClass = JsonType.class)
public class Center {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)  //pk 설정을 DB에게 위임,
    @Column(name = "center_id")
    private Long id;

    private String name;
    private String city;
    private String address;


    @Column(columnDefinition = "integer default 0", nullable = false)
    private int view;

    @OneToMany(mappedBy = "item", fetch = FetchType.EAGER, cascade = CascadeType.REMOVE)
    @OrderBy("id asc")
    private Set<ItemComment> comments;

    @OneToMany(mappedBy = "item", fetch = FetchType.EAGER, cascade = CascadeType.REMOVE)
    @OrderBy("id asc")
    private Set<CenterImages> images;



}