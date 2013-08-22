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
    case cookies[:SkinCookie]
      when "skin-1"
        "class=skin-1"
      when "skin-2"
        "class=skin-2"
      when "skin-3"
        "class=skin-3"
    end
  end
end
