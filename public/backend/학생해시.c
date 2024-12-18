#define _CRT_SECURE_NO_WARNINGS
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include "parson.h"
#include <time.h>
#include <math.h>

#define TABLE_SIZE 5000000
#define NAME_SIZE 100
#define MAX_QUEUE_SIZE 5

// 노트북 데이터 구조체
typedef struct {
	char noteBookName[NAME_SIZE];
	int brokenNumber;
} noteBook;

// 원형 큐 구조체
typedef struct {
	noteBook data[MAX_QUEUE_SIZE];
	int front, rear;
} QueueType;

void print_queue_state(QueueType* q) {
	printf("Queue State - front: %d, rear: %d\n", q->front, q->rear);
	for (int i = 0; i < MAX_QUEUE_SIZE; i++) {
		printf("[%d]: %s, %d\n", i, q->data[i].noteBookName, q->data[i].brokenNumber);
	}
}
// 큐 초기화
void init_queue(QueueType* q) {
	q->front = 0;
	q->rear = 0;
}
// 큐 비어있는지 확인
int is_empty(QueueType* q) {
	return (q->front == q->rear);
}
// 큐 가득 차있는지 확인
int is_full(QueueType* q) {
	return ((q->rear + 1) % MAX_QUEUE_SIZE == q->front);
}
// 큐에 새로운 항목 추가
void enqueue(QueueType* q, noteBook noteBook) {
	if (is_full(q)) {
		printf("큐가 포화상태입니다");
		return;
	}
	q->rear = (q->rear + 1) % MAX_QUEUE_SIZE;
	q->data[q->rear] = noteBook;
}
// 큐의 항목 제거
noteBook dequeue(QueueType* q) {
	noteBook emptyNoteBook = { "", 0 };
	if (is_empty(q)) {
		return emptyNoteBook;
	}
	q->front = (q->front + 1) % MAX_QUEUE_SIZE;
	return q->data[q->front];
}

typedef struct {
	int key;
	char name[NAME_SIZE];
	int broken;
	int day;
} borrow;

struct borrowList {
	borrow item;
	struct borrowList* link;
};

struct borrowList* hash_table_borrow[TABLE_SIZE];

// student 구조체
typedef struct {
	int key;
	char name[NAME_SIZE];
	int phone_number;
	int late_number;
} student;

// 해시 체인의 노드
struct studentList {
	student item;
	struct studentList* link;
};

// student 해시 테이블
struct studentList* hash_table_student[TABLE_SIZE];

void insert_string_data(char* buffer, int size) {
	fgets(buffer, size, stdin);
	buffer[strcspn(buffer, "\n")] = '\0';
}

int hash_function(int key) {
	return key;
}

// 해시 알고리즘
void hash_chain_borrow_add(borrow item, struct borrowList* ht[]) {
	// 해시 키 저장
	int hash_value = hash_function(item.key);
	// 
	struct borrowList* ptr;
	struct borrowList* node_before = NULL;
	struct borrowList* node = ht[hash_value];
	for (; node; node_before = node, node = node->link) {
		if (node->item.key == item.key) {
			fprintf(stderr, "이미 탐색키가 저장되어 있음\n");
			return;
		}
	}
	ptr = (struct borrowList*)malloc(sizeof(struct borrowList));
	ptr->item.key = item.key;
	strcpy(ptr->item.name, item.name);
	ptr->item.broken = item.broken;
	ptr->item.day = item.day;

	ptr->link = NULL;

	if (node_before)
		node_before->link = ptr;
	else
		ht[hash_value] = ptr;
}

// 체인법을 이용하여 테이블에 저장된 키를 탐색
void hash_chain_borrow_search(int key) {
	// 해시 값을 받아올 노드
	struct borrowList* node;
	// 해시 키 획득
	int hash_value = hash_function(key);
	printf("=======================================\n");
	// 해시 키에 해당하는 데이터 없는 경우
	if (hash_table_borrow[hash_value] == NULL) {
		printf("등록된 학번이 없습니다.\n");
		printf("=======================================\n");
		return;
	}
	// 해시 키에 해당하는 학생 해시 가져오기
	for (node = hash_table_borrow[hash_value]; node; node = node->link) {
		printf("학번 : %d / 대여 노트북 : %s / 파손 수치 : %d", node->item.key, node->item.name, node->item.broken);
	}
	printf("\n");
	printf("=======================================\n\n");
}

// 학생 해시 데이터 추가
void hash_chain_student_add(student item, struct studentList* ht[]) {
	// 해시 키 저장
	int hash_value = hash_function(item.key);
	// 학생 해시 노드
	struct studentList* ptr;
	// 체인법 사용으로 인해 연결되어 있는 노드
	struct studentList* node_before = NULL;
	// 해시 키에 해당하는 데이터 저장
	struct studentList* node = ht[hash_value];
	// 중복 키 있는 경우 출력
	for (; node; node_before = node, node = node->link) {
		if (node->item.key == item.key) {
			fprintf(stderr, "이미 탐색키가 저장되어 있음\n");
			return;
		}
	}
	// 새로운 노드 메모리 할당
	ptr = (struct studentList*)malloc(sizeof(struct studentList));
	// 새로운 노드에 키(학번) 추가
	ptr->item.key = item.key;
	// 새로운 노드에 이름 추가
	strcpy(ptr->item.name, item.name);
	// 새로운 노드에 전화번호 추가
	ptr->item.phone_number = item.phone_number;
	// 새로운 노드에 연체횟수 추가
	ptr->item.late_number = item.late_number;

	// 링크 NULL로 초기화
	ptr->link = NULL;

	// 노드가 있으면 링크로 연결
	if (node_before)
		node_before->link = ptr;
	// 아닌 경우 새로운 노드를 해시 테이블에 추가
	else
		ht[hash_value] = ptr;
}

// 체인법을 이용하여 테이블에 저장된 키를 탐색
void hash_chain_student_search(int key) {
	// 해시 값을 받아올 노드
	struct studentList* node;
	// 해시 키 획득
	int hash_value = hash_function(key);
	// 해시 키에 해당하는 데이터 없는 경우
	printf("\n=======================================\n");
	if (hash_table_student[hash_value] == NULL) {
		printf("등록된 학번이 없습니다.\n");
		printf("=======================================\n\n");
		return;
	}
	// 해시 키에 해당하는 학생 해시 가져오기
	for (node = hash_table_student[hash_value]; node; node = node->link) {
		// 정보 출력
		printf("학번 : %d / 이름 : %s 전화번호 : 0%d / 연체 횟수 : %d",
			node->item.key, node->item.name, node->item.phone_number, node->item.late_number);
	}
	printf("\n");
	printf("=======================================\n\n");
}

// 해시 데이터 수정
void hash_chain_student_change(int key, int change_value) {
	struct studentList* node;
	int hash_value = hash_function(key);
	if (hash_table_student[key] == NULL) {
		printf("등록된 학번이 없습니다.\n");
		return;
	}
	node = hash_table_student[hash_value];
	node->item.late_number = change_value;

}

// JSON 파일 읽어와서 해시에 저장
void json_file_student_reading() {
	student data;

	JSON_Value* root_Value = json_parse_file("studentData.json");
	JSON_Object* root_Object = json_value_get_object(root_Value);

	JSON_Array* data_Array = json_object_get_array(root_Object, "studentInfo");
	size_t array_size = json_array_get_count(data_Array);
	for (size_t i = 0; i < array_size; i++) {
		JSON_Object* item = json_array_get_object(data_Array, i);
		if (item != NULL) {
			data.key = (int)json_object_get_number(item, "studentNumber");
			//printf("학번 : %d\n", data.key);

			strcpy(data.name, json_object_get_string(item, "name"));
			//printf("이름 : %s\n", data.name);

			data.phone_number = (int)json_object_get_number(item, "phoneNumber");
			//printf("전화번호 : %d\n", data.phone_number);

			data.late_number = (int)json_object_get_number(item, "dueDateOverNumber");
			//printf("연체 횟수 : %d\n", data.late_number);

			hash_chain_student_add(data, hash_table_student);
			//printf("\n");
		}
	}
	json_value_free(root_Value);
}

size_t json_file_find_index(int student_num, JSON_Array* find_data) {
	size_t array_size = json_array_get_count(find_data);
	for (size_t i = 0; i < array_size; i++) {
		JSON_Object* item = json_array_get_object(find_data, i);
		if (item != NULL && ((int)json_object_get_number(item, "studentNumber")) == student_num) {
			return i;
		}
	}
	return -1;
}

// 블랙리스트 추가
void json_blacklist_add(int student_num, int current_day) {
	// 연체 횟수 3회 초과할 시 3달(90일) 제한
	// 테스트 할때는 3일로 설정하여 바로 확인가능
	int borrow_limit_day = 3; // 90

	JSON_Value* root_Value = json_parse_file("blackList.json");
	JSON_Object* root_Object = json_value_get_object(root_Value);

	JSON_Array* data_Array = json_object_get_array(root_Object, "blackListInfo");
	size_t array_size = json_array_get_count(data_Array);

	JSON_Value* blackList_data = json_value_init_object();
	JSON_Object* blackList_object = json_value_get_object(blackList_data);

	json_object_set_number(blackList_object, "studentNumber", student_num);
	json_object_set_number(blackList_object, "limitStartDay", current_day);
	json_object_set_number(blackList_object, "borrowLimitDay", borrow_limit_day);

	json_array_append_value(data_Array, blackList_data);
	json_serialize_to_file_pretty(root_Value, "blackList.json");
	json_value_free(root_Value);
}

void json_blacklist_delete(int student_num) {
	JSON_Value* root_Value = json_parse_file("blackList.json");
	JSON_Object* root_Object = json_value_get_object(root_Value);

	JSON_Array* black_Array = json_object_get_array(root_Object, "blackListInfo");
	size_t index = json_file_find_index(student_num, black_Array);

	json_array_remove(black_Array, index);

	json_serialize_to_file_pretty(root_Value, "blackList.json");
	json_value_free(root_Value);
}

// JSON 파일 업데이트
void json_file_rewriting(int student_num) {

	time_t timer;
	struct tm* ct;
	timer = time(NULL);
	ct = localtime(&timer);

	JSON_Value* root_Value = json_parse_file("studentData.json");
	JSON_Object* root_Object = json_value_get_object(root_Value);

	JSON_Array* data_Array = json_object_get_array(root_Object, "studentInfo");
	size_t array_size = json_array_get_count(data_Array);

	size_t index = json_file_find_index(student_num, data_Array);
	int change_value = 0;

	JSON_Object* change = json_array_get_object(data_Array, index);
	int check_limit = (int)json_object_get_number(change, "dueDateOverCheck");

	if (change != NULL && check_limit != 1) {
		change_value = (int)json_object_get_number(change, "dueDateOverNumber");
		change_value += 1;
		json_object_set_number(change, "dueDateOverNumber", change_value);
		hash_chain_student_change(student_num, change_value);
	}
	if (change_value >= 3 && check_limit != 1) {
		json_blacklist_add(student_num, ct->tm_yday);
		json_object_set_number(change, "dueDateOverCheck", 1);
		json_object_set_number(change, "dueDateOverNumber", 0);
	}
	else if (check_limit == 1) {
		json_blacklist_delete(student_num);
		json_object_set_number(change, "dueDateOverCheck", 0);
		hash_chain_student_change(student_num, 0);
	}
	json_serialize_to_file_pretty(root_Value, "studentData.json"); // Json 파일 변경점 저장, 이 코드가 있어야 JSON파일이 수정됨
	json_value_free(root_Value);
}

void json_data_add() {
	// 이름
	char newName[20] = "";
	// 학번
	int student_num = 0;
	// 전화번호
	int phone_num = 0;
	// 연체 횟수
	int due_date_over_num = 0;
	// 대여 제한 여부
	int borrow_limit = 0;

	// 학생 데이터 구조체 변수
	student data;

	printf("학번 : ");
	scanf_s("%d", &student_num);
	while (getchar() != '\n');
	// 학번을 키로 저장
	data.key = student_num;

	printf("이름 : ");
	insert_string_data(newName, 20);
	// 이름 저장
	strcpy(data.name, newName);

	printf("전화번호 : ");
	scanf_s("%d", &phone_num);
	while (getchar() != '\n');
	// 전화번호 저장
	data.phone_number = phone_num;
	// 연체 횟수 저장
	data.late_number = due_date_over_num;

	hash_chain_student_add(data, hash_table_student);

	JSON_Value* root_Value = json_parse_file("studentData.json");
	JSON_Object* root_Object = json_value_get_object(root_Value);

	JSON_Array* data_Array = json_object_get_array(root_Object, "studentInfo");
	size_t array_size = json_array_get_count(data_Array);

	JSON_Value* new_student_data = json_value_init_object();
	JSON_Object* new_student_object = json_value_get_object(new_student_data);

	json_object_set_number(new_student_object, "studentNumber", student_num);
	json_object_set_string(new_student_object, "name", newName);
	json_object_set_number(new_student_object, "phoneNumber", phone_num);
	json_object_set_number(new_student_object, "dueDateOverNumber", due_date_over_num);
	json_object_set_number(new_student_object, "dueDateOverCheck", borrow_limit);

	json_array_append_value(data_Array, new_student_data);
	json_serialize_to_file_pretty(root_Value, "studentData.json");
	json_value_free(root_Value);

}

void check_borrow_limit(int current_day) {
	JSON_Value* root_Value = json_parse_file("blackList.json");
	JSON_Object* root_Object = json_value_get_object(root_Value);

	JSON_Array* data_Array = json_object_get_array(root_Object, "blackListInfo");
	size_t array_size = json_array_get_count(data_Array);
	for (size_t i = 0; i < array_size; i++) {
		JSON_Object* change = json_array_get_object(data_Array, i);
		int student_num = (int)json_object_get_number(change, "studentNumber");
		if (change != NULL) {
			int limit_day = (int)json_object_get_number(change, "borrowLimitDay");
			int limitStartDay = (int)json_object_get_number(change, "limitStartDay");
			if (limit_day == 0) {
				json_file_rewriting(student_num);
			}
			else if ((limitStartDay + 1) <= /*current_day*/ 500) { // 500은 하루가 지나지 않아서 강제로 테스트하기 위해 임의로 입력한 조건, 원래는 current_day
				int limit_day = (int)json_object_get_number(change, "borrowLimitDay");
				json_object_set_number(change, "borrowLimitDay", limit_day - 1);
				hash_chain_student_change(student_num, limit_day);
				json_serialize_to_file_pretty(root_Value, "blackList.json"); // Json 파일 변경점 저장, 이 코드가 있어야 JSON파일이 수정됨
			}
		}

	}
	json_value_free(root_Value);
}

// JSON 파일 읽어와서 해시에 저장
void json_file_noteBook_reading(QueueType* queue) {
	noteBook data;

	JSON_Value* root_Value = json_parse_file("noteBook.json");
	JSON_Object* root_Object = json_value_get_object(root_Value);

	JSON_Array* data_Array = json_object_get_array(root_Object, "noteBookInfo");
	size_t array_size = json_array_get_count(data_Array);
	for (size_t i = 0; i < array_size; i++) {
		JSON_Object* item = json_array_get_object(data_Array, i);
		if (item != NULL) {
			strcpy(data.noteBookName, json_object_get_string(item, "borrowNoteBook"));
			data.brokenNumber = (int)json_object_get_number(item, "brokenNum");
		}
		enqueue(queue, data);
	}
	json_value_free(root_Value);
}

void student_borrow_noteBook(QueueType* queue, int student_num, int current_day) {
	// 대여 해시를 구성할 데이터를 담을 변수
	borrow data;
	// 노트북 원형 큐에서 노트북 데이터 받아와서 저장
	noteBook noteBookData = dequeue(queue);
	// 노트북이 없는 경우에는 ""를 저장하고 있고 실제로 없는 경우 출력하는 부분
	if (strcmp(noteBookData.noteBookName, "") == 0 && noteBookData.brokenNumber == 0) {
		printf("=======================================\n");
		printf("대여 가능한 노트북이 없습니다.\n");
		printf("=======================================\n\n");
		return;
	}
	// 대여 해시 키 저장
	data.key = hash_function(student_num);
	// 대여 해시에 노트북 이름 저장
	strcpy(data.name, noteBookData.noteBookName);
	// 대여 해시에 파손 수 저장
	data.broken = noteBookData.brokenNumber;
	// 대여 해시에 대여하는 날 저장
	data.day = current_day;
	// 대여 해시에 추가
	hash_chain_borrow_add(data, hash_table_borrow);
	// JSON 데이터 추가하는 부분
	JSON_Value* root_Value = json_parse_file("borrowList.json");
	JSON_Object* root_Object = json_value_get_object(root_Value);

	JSON_Array* data_Array = json_object_get_array(root_Object, "borrowInfo");
	size_t array_size = json_array_get_count(data_Array);

	JSON_Value* borrowList_data = json_value_init_object();
	JSON_Object* borrowList_object = json_value_get_object(borrowList_data);

	json_object_set_number(borrowList_object, "studentNumber", student_num);
	json_object_set_string(borrowList_object, "noteBookName", noteBookData.noteBookName);
	json_object_set_number(borrowList_object, "brokenNum", noteBookData.brokenNumber);
	json_object_set_number(borrowList_object, "borrowStartDay", current_day);

	json_array_append_value(data_Array, borrowList_data);
	json_serialize_to_file_pretty(root_Value, "borrowList.json");
	json_value_free(root_Value);
	printf("=======================================\n");
	printf("대여자 학번 : %d / 대여된 노트북 : %s / 반납 기한은 1개월 입니다.\n", student_num, data.name);
	printf("=======================================\n\n");
}
// 해시 데이터 삭제
int hash_chain_borrow_delete(int student_num, borrow* removed_item, int current_day) {
	// 해시값 계산
	int hash_value = hash_function(student_num);

	// 해시 테이블의 해당 버킷 가져오기
	struct borrowList* node = hash_table_borrow[hash_value];
	struct borrowList* node_before = NULL;
	// 연결 리스트 탐색
	while (node != NULL) {
		if (node->item.key == student_num) { // 키가 일치하면
			if (node_before == NULL) {
				hash_table_borrow[hash_value] = node->link;
			}
			else {
				node_before->link = node->link;
			}
			// 결과 반환
			if (removed_item != NULL) {
				*removed_item = node->item;
				int borrow_day = node->item.day - current_day;
				// -1 은 테스트를 위해 블랙리스트에 임의로 추가하기 위한 조건, 원래는 대여기간인 30
				if (abs(borrow_day) > -1 /*30*/) {
					printf("=======================================\n");
					printf("초과한 기간 %d\n", borrow_day);
					printf("=======================================\n\n");
					json_file_rewriting(student_num);
				}
			}
			printf("=======================================\n");
			printf("학번 : %d / 반납 노트북 : %s / 반납완료 되었습니다.\n", student_num, node->item.name);
			printf("=======================================\n\n");
			free(node);
			return 1; // 성공
		}
		node_before = node;
		node = node->link; // 다음 노드로 이동
	}

	// 일치하는 데이터가 없을 경우
	printf("=======================================\n");
	printf("삭제하려는 항목이 없습니다.\n");
	printf("=======================================\n\n");
	return 0; // 실패
}


void student_return_noteBook(QueueType* queue, int student_num, int current_day) {
	// 대여 해시의 데이터 저장할 변수
	borrow item;
	// 해시 키(학번)에 해당하는 정보 없는 경우 실행되는 부분
	if (!hash_chain_borrow_delete(student_num, &item, current_day)) {
		printf("학번 대여 정보 없다\n\n");
		return;
	}
	// 반납되는 노트북 데이터 저장할 변수
	noteBook noteBookData;
	// 노트북 이름 데이터 저장
	strcpy(noteBookData.noteBookName, item.name);
	// 노트북 파손 수 데이터 저장
	noteBookData.brokenNumber = item.broken;

	// JSON 데이터 삭제하는 부분
	JSON_Value* root_Value = json_parse_file("borrowList.json");
	JSON_Object* root_Object = json_value_get_object(root_Value);

	JSON_Array* borrow_Array = json_object_get_array(root_Object, "borrowInfo");
	size_t index = json_file_find_index(student_num, borrow_Array);

	json_array_remove(borrow_Array, index);

	json_serialize_to_file_pretty(root_Value, "borrowList.json");
	json_value_free(root_Value);

	// 큐가 가득 차있지 않는다면 노트북 정보 다시 큐에 삽입
	if (!is_full(queue)) {
		enqueue(queue, noteBookData);
	}
	// 큐가 가득찬 경우
	else
		printf("큐 포화\n\n");
}

int main() {
	int choice;
	int student_num;
	QueueType queue;
	init_queue(&queue);
	json_file_noteBook_reading(&queue);
	json_file_student_reading();

	time_t timer;
	struct tm* t;
	timer = time(NULL);
	t = localtime(&timer);
	int current = 0;
	while (1) {
		current = t->tm_yday;
		check_borrow_limit(current);
		printf("------선택지------\n1. 학생조회\n2. 대여\n3. 대여 현황 검색\n4. 반납\n5. 새로운 학생 추가\n6. 종료\n입력 => ");
		scanf_s("%d", &choice);
		// 학생 조회
		if (choice == 1) {
			printf("학번 입력 => ");
			scanf_s("%d", &student_num);
			hash_chain_student_search(student_num);
		}
		// 대여
		else if (choice == 2) {
			printf("학번 입력 => ");
			scanf_s("%d", &student_num);
			student_borrow_noteBook(&queue, student_num, current);
		}
		// 대여 현황 검색
		else if (choice == 3) {
			printf("학번 입력 => ");
			scanf_s("%d", &student_num);
			hash_chain_borrow_search(student_num);
		}
		// 반납
		else if (choice == 4) {
			printf("학번 입력 => ");
			scanf_s("%d", &student_num);
			student_return_noteBook(&queue, student_num, current);
		}
		/*
		// 반납 시 자동으로 업데이트
		// 연체 학생 업데이트
		else if (choice == 5) {
			printf("학번 입력 => ");
			scanf_s("%d", &student_num);
			json_file_rewriting(student_num);
			hash_chain_student_search(student_num);
		}
		*/
		// 새로운 학생 추가
		else if (choice == 5) {
			json_data_add();
		}
		// 종료
		else if (choice == 6)
			break;
		else
			printf("다시 입력하십시오\n\n");
	}
	return 0;
}