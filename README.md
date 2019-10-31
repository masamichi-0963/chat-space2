# README

This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

* Ruby version

* System dependencies

* Configuration

* Database creation

* Database initialization

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

* ...
# chat-space



## userテーブル

|Column|Type|Options|
|------|----|-------|
|name|string|index:true,null: false,unique:true|

### Association
- has_many :groups, through: :members
- has_many :members
- has_many :messages

## messageテーブル

|Column|Type|Options|
|------|----|-------|
|content|string|null: false|
|image|string|null: false|
|user_id|references|null: false,foreign_key: true|
|group_id|references|null: false,foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user

## groupsテーブル

|Column|Type|Options|
|------|----|-------|
|name|string|null:false|

### Association

- has_many :groups, through: :members
- has_many :members
- has_many :messages


## memmbersテーブル

|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user
