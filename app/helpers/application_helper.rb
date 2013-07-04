module ApplicationHelper

  def active_page? (path)
    if current_page?(path)
      raw ('class=active')
    else
      ''
    end
  end

  def active_menu? (path)
    path ? 'active open' : ''
  end

  def skin_method
    @user = current_user
    case @user.skin
      when "#222A2D"
        "class=skin-1"
      when "#C6487E"
        "class=skin-2"
      when "#D0D0D0"
        "class=skin-3"
    end
  end
end
