json.array! @scores do |score|
 user = user.find(score.user_id)
 json.id score.id
 json.email user.email
 json.value score.value
 json.created_at score.created_at
end
