class FloorPlanPdfGetter

  @queue = :floor_plans_queue

  def self.perform(html, name, id)
    @floor_plan = FloorPlan.find(id)
    pdf = WickedPdf.new.pdf_from_string(html,:orientation => 'Landscape',
      :margin  =>  {
				top: 1,
        bottom: 1,
        left: 1,
        right: 1
    })

    save_path = Rails.root.join('public','floor_print.pdf')
    File.open(save_path, 'wb') do |file|
      file << pdf
    end
    date = DateTime.now
    path = 'pdfs/' + [name, date.strftime("%m-%d-%Y %H:%M")].join('-') + '.pdf'
    s3 = Aws::S3::Resource.new(region:'us-east-1')
    obj = s3.bucket('osman-floor-plan').object(path)

    File.open('public/floor_print.pdf', 'rb') do |file|
      obj.put(body: file)
    end

    @floor_plan.update(pdf_url: obj.public_url)

    File.delete('public/floor_print.pdf')
    obj.public_url
  end

end
