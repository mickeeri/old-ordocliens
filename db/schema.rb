# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20160518091801) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "clients", force: :cascade do |t|
    t.string   "last_name"
    t.string   "first_name"
    t.string   "ssn"
    t.string   "street"
    t.string   "post_code"
    t.string   "city"
    t.text     "note"
    t.integer  "user_id"
    t.datetime "created_at",   null: false
    t.datetime "updated_at",   null: false
    t.string   "email"
    t.string   "phone_number"
  end

  add_index "clients", ["first_name"], name: "index_clients_on_first_name", using: :btree
  add_index "clients", ["last_name"], name: "index_clients_on_last_name", using: :btree
  add_index "clients", ["ssn"], name: "index_clients_on_ssn", using: :btree
  add_index "clients", ["user_id"], name: "index_clients_on_user_id", using: :btree

  create_table "counterparts", force: :cascade do |t|
    t.string   "name"
    t.string   "personal_number"
    t.text     "info"
    t.string   "representative"
    t.datetime "created_at",      null: false
    t.datetime "updated_at",      null: false
  end

  create_table "disputes", force: :cascade do |t|
    t.integer  "client_id"
    t.integer  "counterpart_id"
    t.datetime "created_at",     null: false
    t.datetime "updated_at",     null: false
  end

  add_index "disputes", ["client_id"], name: "index_disputes_on_client_id", using: :btree
  add_index "disputes", ["counterpart_id"], name: "index_disputes_on_counterpart_id", using: :btree

  create_table "expenses", force: :cascade do |t|
    t.text     "entry"
    t.decimal  "price"
    t.date     "date"
    t.integer  "lawsuit_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_index "expenses", ["lawsuit_id"], name: "index_expenses_on_lawsuit_id", using: :btree

  create_table "firms", force: :cascade do |t|
    t.string   "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "involvements", force: :cascade do |t|
    t.integer  "lawsuit_id"
    t.integer  "counterpart_id"
    t.datetime "created_at",     null: false
    t.datetime "updated_at",     null: false
  end

  add_index "involvements", ["counterpart_id"], name: "index_involvements_on_counterpart_id", using: :btree
  add_index "involvements", ["lawsuit_id"], name: "index_involvements_on_lawsuit_id", using: :btree

  create_table "lawsuit_types", force: :cascade do |t|
    t.string   "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "lawsuits", force: :cascade do |t|
    t.boolean  "closed",          default: false
    t.datetime "created_at",                      null: false
    t.datetime "updated_at",                      null: false
    t.string   "court"
    t.string   "case_number"
    t.string   "slug"
    t.integer  "lawsuit_type_id"
    t.integer  "user_id"
  end

  add_index "lawsuits", ["lawsuit_type_id"], name: "index_lawsuits_on_lawsuit_type_id", using: :btree
  add_index "lawsuits", ["slug"], name: "index_lawsuits_on_slug", using: :btree
  add_index "lawsuits", ["user_id"], name: "index_lawsuits_on_user_id", using: :btree

  create_table "participations", force: :cascade do |t|
    t.integer  "client_id"
    t.integer  "lawsuit_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_index "participations", ["client_id"], name: "index_participations_on_client_id", using: :btree
  add_index "participations", ["lawsuit_id"], name: "index_participations_on_lawsuit_id", using: :btree

  create_table "price_categories", force: :cascade do |t|
    t.string   "name"
    t.decimal  "price"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "tasks", force: :cascade do |t|
    t.text     "entry"
    t.date     "date"
    t.decimal  "worked_hours"
    t.integer  "lawsuit_id"
    t.datetime "created_at",        null: false
    t.datetime "updated_at",        null: false
    t.integer  "price_category_id"
  end

  add_index "tasks", ["lawsuit_id"], name: "index_tasks_on_lawsuit_id", using: :btree
  add_index "tasks", ["price_category_id"], name: "index_tasks_on_price_category_id", using: :btree

  create_table "users", force: :cascade do |t|
    t.string   "last_name"
    t.integer  "firm_id"
    t.datetime "created_at",                          null: false
    t.datetime "updated_at",                          null: false
    t.string   "email",                  default: "", null: false
    t.string   "encrypted_password",     default: "", null: false
    t.string   "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",          default: 0,  null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string   "current_sign_in_ip"
    t.string   "last_sign_in_ip"
    t.string   "first_name"
  end

  add_index "users", ["email"], name: "index_users_on_email", unique: true, using: :btree
  add_index "users", ["firm_id"], name: "index_users_on_firm_id", using: :btree
  add_index "users", ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true, using: :btree

  add_foreign_key "clients", "users"
  add_foreign_key "disputes", "clients"
  add_foreign_key "disputes", "counterparts"
  add_foreign_key "expenses", "lawsuits"
  add_foreign_key "involvements", "counterparts"
  add_foreign_key "involvements", "lawsuits"
  add_foreign_key "lawsuits", "lawsuit_types"
  add_foreign_key "lawsuits", "users"
  add_foreign_key "participations", "clients"
  add_foreign_key "participations", "lawsuits"
  add_foreign_key "tasks", "lawsuits"
  add_foreign_key "tasks", "price_categories"
  add_foreign_key "users", "firms"
end
