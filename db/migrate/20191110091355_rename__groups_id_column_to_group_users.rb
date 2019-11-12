class RenameGroupsIdColumnToGroupUsers < ActiveRecord::Migration[5.0]
    def change
      rename_column :group_users, :groups_id, :group_id
    end
  end