class ChangeColumnToGroupsUsers < ActiveRecord::Migration[5.0]
  def change
    rename_column :groups_users, :groups_id,:group_id
  end
end
