function validcheckstatus(name,action,text)
{
	var chObj	=	document.getElementsByName(name);
	var result	=	false;	
	for(var i=0;i<chObj.length;i++){
	
		if(chObj[i].checked){
		  result=true;
		  break;
		}
	}
 
	if(!result){
		 alert("Please select atleast one "+text+" to "+action+".");
		 return false;
	}else if(action=='delete'){
			 if(!confirm("Are you sure you want to delete this.")){
			   return false;
			 }else{
				return true;
			 }
	}else{
		return true;
	}
}



function increment(id,avlqtyid)
{ 

var obj = document.getElementById(id);
var max_qty ;
max_qty = document.getElementById(avlqtyid).value;

			var val=obj.value;	
			if( parseInt(val)< max_qty ) {
				
			   obj.value=(+val + 1);
			   
			}else{
				
				alert("Maximum available quantity  is "+max_qty+".You can not add  more then available Quantity.");
			 	
			}
}
function decrement(id)
{ 
   var obj = document.getElementById(id);
	var val=obj.value
	if(val==1 || val <1)
		val=1;
	else
	  val=(val - 1);
		
	obj.value=val || 1;
}


function show_dialogbox()
{
	$("#dialog_overlay").fadeIn(100);
	$("#dialog_box").fadeIn(100);
}
function hide_dialogbox()
{
	$("#dialog_overlay").fadeOut(100);
	$("#dialog_box").fadeOut(100);
}

function showloader(id)
{
	$("#"+id).after("<span id='"+id+"_loader'><img src='"+site_url+"assets/loader.gif'/></span>");
}


function hideloader(id)
{
	$("#"+id+"_loader").remove();
}
												
												
function load_more(base_uri,more_container,formid)
{	
  showloader(more_container);
  $("#more_loader_link"+more_container).remove();
   if(formid!='0')
   {
	   form_data=$('#'+formid).serialize();
   }
   else
   {
	   form_data=null;
   }
  $.post
	  (
		  base_uri,
		  form_data,
		  function(data)
		  { 
		  
		  
			 var dom = $(data);
			
			dom.filter('script').each(function(){
			$.globalEval(this.text || this.textContent || this.innerHTML || '');
			});
			
			var currdata = $( data ).find('#'+more_container).htmll(); $('#'+more_container).append(currdata);
			hideloader(more_container);
		  }
	  );
}


 



function join_newsletter()
{	
	var form = $("#chk_newsletter");	
	showloader('newsletter_loder');
	$(".btn").attr('disabled', true);		
	$.post(site_url+"pages/join_newsletter",
		  $(form).serialize(),		   
		   function(data){
			
			     $("#my_newsletter_msg").htmll(data);				
				 $(".btn").attr('disabled', false);				 
			     hideloader('newsletter_loder');
				 $('input').val('');					 
			   });
	
	return false;
	
}

$(document).ready(function() {
	
	$('.usewallet').click(function(){
		var chkstatus=2;
		if($(this).is(':checked'))
		{
			chkstatus=1;	
		}
		
		var ajax_url=site_url+'remote/paymentform';
		$.ajax({
			type: "POST",
			url: ajax_url,
			dataType: "html",
			data: "chkstatus="+chkstatus,
			cache:false,
			success:
				function(data)
				{
					var resp=data.split('~');
					$("#payment_method_form").htmll(resp[0]);
					$(".netpayable").htmll(resp[1]);
				}
				
	}); 
	
	});

	
	$('.sizeinv').click(function(){
		
		var sid=$(this).val();
		var pid=$('#pid').val();
		var ajax_url=site_url+'remote/get_size_qty';
		$.ajax({
			type: "POST",
			url: ajax_url,
			dataType: "html",
			data: "pid="+pid+"&sid="+sid,
			cache:false,
			success:
				function(data)
				{
					$(".avlstock").htmll(data);
				}
				
	}); 
		
		})
	
	$('.checkbox').click(function()
	{
		var len;
		len=$('[name="arr_ids[]"]:checked').length;
		if(len>2)
		{
			alert("Only two products allowed per combo.");
			$(this).attr('checked',false);
		}
	});
	
	/*for left selectbox filtration */
	$('.leftselectbox').change(
	function()
	{
		var attr_id;
		var attr_val_id;
		var attr_and_val_id;
		var prev_hidden_ids;
		var prev_hidden_ids_arr=new Array();
		var prev_hidden_ids_arr_filtered=new Array();
		
		attr_id=$(this).attr('name');
		attr_val_id=$(this).val();
		attr_and_val_id=attr_id+'-'+attr_val_id;
		//alert(attr_and_val_id);
		prev_hidden_ids = $('#leftselectbox_ids').val();
		
		prev_hidden_ids_arr=prev_hidden_ids.split(',');
		for(var i=0;i<prev_hidden_ids_arr.length;i++)
		{
			var loop_attr_val_id_arr=prev_hidden_ids_arr[i].split('-');
			if(loop_attr_val_id_arr[0]!=attr_id)
			{
				prev_hidden_ids_arr_filtered.push(prev_hidden_ids_arr[i]);
			}
		}
		if(attr_val_id!=''){
			prev_hidden_ids_arr_filtered.push(attr_and_val_id);
		}
		prev_hidden_ids_arr_filtered=$.unique(prev_hidden_ids_arr_filtered);
		
		prev_hidden_ids_arr_filtered = jQuery.grep(prev_hidden_ids_arr_filtered, function(n, i){
			return (n !== "" && n != null);
		});
		
		attr_and_val_id=prev_hidden_ids_arr_filtered.join(",");
		
		
		
		$('#leftselectbox_ids').val(attr_and_val_id);
		//return false;
		single_left_search('attr_val_selectbox',attr_and_val_id,'myform');
		});
		
		//for left checkbox sorting
		$('.leftattr').click(function()
		{
			var attr_id;
			var attr_val_id;
			var attr_and_val_id;
			var prev_hidden_ids;
			var prev_hidden_ids_arr=new Array();
			
			attr_id=$(this).attr('name');
			attr_val_id=$(this).val();
			attr_and_val_id=attr_id+'-'+attr_val_id;
			//alert(attr_and_val_id);
			prev_hidden_ids = $('#leftcheckbox_ids').val();
			prev_hidden_ids_arr=prev_hidden_ids.split(',');
			
			if(attr_val_id!=''){
				if($(this).is(":checked"))
				{
					prev_hidden_ids_arr.push(attr_and_val_id);
				}
				else
				{
					//prev_hidden_ids_arr.pop(attr_and_val_id);
					var arrindex=prev_hidden_ids_arr.indexOf(attr_and_val_id);
					
					if(arrindex !=-1)
					{
						prev_hidden_ids_arr.splice(arrindex,1);
					}
					
				}
			}
			prev_hidden_ids_arr=$.unique(prev_hidden_ids_arr);
			prev_hidden_ids_arr = jQuery.grep(prev_hidden_ids_arr, function(n, i){
				return (n !== "" && n != null);
			});
			
			attr_and_val_id=prev_hidden_ids_arr.join(",");
			
			
			
			$('#leftcheckbox_ids').val(attr_and_val_id);
			
			multisearch('attr_val','myform');
		
		//return false;
		
		
		});
		//end of code block
		
		
	
		$(".anchorbox").click(function(){
				
     window.location=$(this).find("a").attr("href"); 
     return false;
		});
		
		$(".anchorbox1").click(function(){
				
     //window.location=$('.anchorbox').find("a").attr("href");
		 window.location=$(this).parents(".cat-box").find("a").attr("href");
		 
     return false;
		});
		
		
	
    $('.trigger_citygroup').click(function(){
        $('.citypup').trigger('click');
    });
	
	$('.mainsel').click(function(){
		$('.mainsel').parent().removeAttr( 'style' );
		$(this).parent().css('background', '#e2f1cf');
	});
	
	$(".subcatsel").live("click",function(){
		//$('.subcatsel').parent().removeAttr( 'style' );
		//$(this).parent().css('background', '#FFB547');
	});
	
	$(':checkbox.ckblsp').click(function()
    {
	 
		$(':input','#ship_container').val('');
		
		if($(this).attr('checked'))
		{
			$('#ship_container').hide();
			
		}else{
			
			$('#ship_container').show();
				
		}	
	}); 
		
	
	var showChar = 50;
	var ellipsestext = "...";
	var moretext = "read more";
	var lesstext = "less";
	$('.more').each(function() {
		var content = $(this).htmll();

		if(content.length > showChar) {

			var c = content.substr(0, showChar);
			var h = content.substr(showChar-1, content.length - showChar);

			var html = c + '<span class="moreelipses red">'+ellipsestext+'</span>&nbsp;<span class="morecontent"><span>' + h + '</span>&nbsp;&nbsp;<a href="" class="morelink red">'+moretext+'</a></span>';

			$(this).htmll(html);
		}

	});	
	$(".morelink").click(function(){
		if($(this).hasClass("less")) {
			$(this).removeClass("less");
			$(this).htmll(moretext);
		} else {
			$(this).addClass("less");
			$(this).htmll(lesstext);
		}
		$(this).parent().prev().toggle();
		$(this).prev().toggle();
		return false;
	});
});



/*Online List Support Methods*/
function bind_data(parent_id,method_url,container_id,loader_container,from_section,extra_atr)
{
	showloader(loader_container);
	$("#"+container_id).hide();  
	
	var ajax_url=site_url+method_url;
	
	if(from_section=='from_country')
	{
		$('#city_list').htmll('<select name="city_id" class="txtbox w40 p4 b"><option value="">Select One</option></select>');
		$('#neighborhood_list').htmll('<select name="location" class="txtbox w40 p4 b"><option value="">Select One</option></select>');
	}
	
	else if(from_section=='from_state')
	{
		//$('#neighborhood_list').htmll('<select name="location" class="txtbox w40 p4 b"><option value="">Select One</option></select>');
		//$('#neighborhood_list').htmll('<div style="width: 310px; height: 50px; overflow-y: scroll;" class="txtbox p4 b">');
		$('#neighborhood_list').htmll('');
	}
	else if(from_section=='from_left_country')
	{
		$('#city_list').htmll('<select name="city_id" class="fr p2 fs11 w140p"><option value="">Select One</option></select>');
		$('#state_list').htmll('<select name="state_id" class="fr p2 fs11 w140p"><option value="">Select One</option></select>');
	}
	else if(from_section=='from_left_state')
	{
		$('#city_list').htmll('<select name="city_id" class="fr p2 fs11 w140p"><option value="">Select One</option></select>');
	}
	
	
	$.ajax({
			type: "POST",
			url: ajax_url,
			dataType: "html",
			data: "parent_id="+parent_id+"&from_section="+from_section+"&extra="+extra_atr,
			cache:false,
			success:
				function(data)
				{
					$("#"+container_id).show();
					$("#"+container_id).htmll(data);
					hideloader(loader_container);
					
				}
				
	}); 
}

function bind_cat_data(parent_id,method_url,container_id,loader_container,from_section)
{
	
	showloader(loader_container);
	$("#"+container_id).hide();  
	var ajax_url=site_url+method_url;
	var country_id=$('.leftcat').val();
	
	$.ajax({
			type: "POST",
			url: ajax_url,
			dataType: "html",
			data: "parent_id="+parent_id+"&from_section="+from_section+"&country_id="+country_id,
			cache:false,
			success:
				function(data)
				{
					$("#"+container_id).show();
					$("#"+container_id).htmll(data);
					hideloader(loader_container);
					
				}
				
	}); 
}

function bind_subcat(pid,container_id,loader_container)
{
	
	showloader(loader_container);
	$("#"+container_id).hide(); 
	var country=$('.contlist').val();
	
	
	var ajax_url=site_url+"classifieds/bind_subcat";
	
		$.ajax({
			type: "POST",
			url: ajax_url,
			dataType: "html",
			data: "parent_id="+pid+"&country_id="+country+"&sec="+section_url,
			cache:false,
			success:
				function(data)
				{
					$("#"+container_id).show();
					$("#"+container_id).htmll(data);
					hideloader(loader_container);
					
				}
				
	}); 	
}

function create_form_element(pid,container_id,loader_container,method_url)
{
	var section_url='';
	showloader(loader_container);
	$("#"+container_id).hide();  
	
	
	var ajax_url=site_url+method_url;
	
		$.ajax({
			type: "POST",
			url: ajax_url,
			dataType: "html",
			data: "parent_id="+pid+"&sec="+section_url,
			cache:false,
			success:
				function(data)
				{
					$("#"+container_id).show();
					$("#"+container_id).htmll(data);
					hideloader(loader_container);
					
				}
				
	}); 		
}


function create_sizecolor_element(pid,container_id,loader_container,method_url)
{
	var section_url='';
	showloader(loader_container);
	$("#"+container_id).hide();  
	
	
	var ajax_url=site_url+method_url;
	
		$.ajax({
			type: "POST",
			url: ajax_url,
			dataType: "html",
			data: "parent_id="+pid+"&sec="+section_url,
			cache:false,
			success:
				function(data)
				{
					$("#"+container_id).show();
					$("#"+container_id).htmll(data);
					hideloader(loader_container);
					
				}
				
	}); 		
}

function check_user_and_login(container_id,loader_container)
{
	//showloader(loader_container);
	$("#"+container_id).hide();  
	
	var ajax_url=site_url+"classifieds/user_login";
	
	var pkg_type=$('input[class=ext_ads_type]:radio:checked').val();
	
	
	var username=$('#username').val();
	var password=$('#password').val();
	if(username=='')
	{
		alert("Please enter username/email id.");
		$('#username').focus();
		return false;	
	}
	else if(password=='')
	{
		alert("Please enter password.");
		$('#password').focus();
		return false;	
	}
	else
	{
			$.ajax({
				type: "POST",
				url: ajax_url,
				dataType: "html",
				data: "username="+username+"&password="+password,
				cache:false,
				success:
					function(data)
					{
						var resp=data;
						
						var resp_arr=resp.split('~');
						if(resp_arr[1]==1)
						{
							$('#loginform').hide();	
						}
						
						$("#"+container_id).show();
						$("#"+container_id).htmll(resp_arr[0]);
						hideloader(loader_container);
						
					}
				
			}); 
	}
	
	
}

function multisearch_common(chkname,srchkey,frmid)
{	
	var arrval=new Array();
	$('[name='+chkname+']:checked').each(function(mkey,mval)
	{
		arrval.push($(mval).val());
		
	});
	
	$('#'+srchkey).val(arrval.join(","));	
	$("#"+frmid).submit();
	
	
}



function clear_showonly(clearclass)
{
	$('.'+clearclass).removeAttr('checked');	
	multisearch_common('filter_type1','post_filter_type1','myform')	
}

function multisearch(srchkey,frmid,cls)
{	
	var arrval=new Array();
	var values = $('input:checkbox:checked.'+cls).map(function () {
  	return this.value;
	}).get();
	
	arrval.push(values);
	
	$('#'+srchkey).val(arrval.join(","));	
	$("#"+frmid).submit();
}

function single_left_search(srchkey,srchval,frmid)
{	
	var attr_val_arr=new Array();
	
	attr_val_arr = $(".leftselectbox").map(function(){
																								    if(this.value!='')return this.value;
																										}).get();
	
	$('#'+srchkey).val(attr_val_arr.join(","));	
	$("#"+frmid).submit();
}






function single_search(srchkey,srchval,frmid)
{	
	
	$('#'+srchkey).val(srchval);	
	$("#"+frmid).submit();
}

function price_search()
{
	var minp=$('#min_price').val();
	var maxp=$('#max_price').val();
	if((minp=='' || minp=='Min.') && (maxp=='' || maxp=='Max.'))
	{
		alert("Please enter atleast one price value either min. price or max. price.");
		$('#min_price').focus();
		return false;
		
	}
	else
	{
		if(parseInt(minp)>=0 && parseInt(maxp)>=0 && parseInt(maxp)<parseInt(minp))
		{
			alert("Max. price should be greater than min. price.");
			$('#max_price').focus();
			return false;
		}
		else
		{
			$('#minprice').val(minp);	
			$('#maxprice').val(maxp);	
			$("#myform").submit();
		}
	}
}

function clear_price()
{
	$('#min_price').val('');
	$('#max_price').val('');
	$('#minprice').val('');
	$('#maxprice').val('');
	$("#myform").submit();
}

function add_to_fav(adsid,method_url)
{
	//showloader(loader_container);
	//$("#"+container_id).hide();  
	
	var ajax_url=site_url+method_url;
	
		$.ajax({
			type: "POST",
			url: ajax_url,
			dataType: "html",
			data: "ads_id="+adsid,
			cache:false,
			success:
				function(data)
				{
					$("#fav_resp").htmll(data);
					//window.location.reload();
					//$("#"+container_id).show();
					//$("#"+container_id).htmll(data);
					//hideloader(loader_container);
					
				}
				
	}); 		
}


function likedislike_profilecomm(type,record_id,profileID,control)
{
	 //showloader("showload"+record_id);
	 
	 $.post(site_url+control+"/addlikedislike",
		   {"record_id":record_id,"profileID": profileID,"type":type},
		   
		   function(data){
				data = $.parseJSON(data);
				$("span#imp"+record_id).htmll(data.impresscnt);
				$("span#dimp"+record_id).htmll(data.deresscnt);
				hideloader("showload"+record_id);
			   
					 
					
			   });
	
	return false;
	
}

function ads_like(adsid,hit_type)
{
	var resp_id=adsid+'_'+hit_type;
	var ajax_url=site_url+'classifieds/ads_like_dislike';
	
		$.ajax({
			type: "POST",
			url: ajax_url,
			dataType: "html",
			data: "ads_id="+adsid+"&hit_type="+hit_type,
			cache:false,
			success:
				function(data)
				{
					$("#"+resp_id).htmll(data);
				}
	}); 
}



$('#chk_all').live('click',function()
{
	if($(this).is(":checked"))
	{
		$('.ads_loc').prop( 'checked',true );
	}
	else
	{
		$('.ads_loc').prop( 'checked',false );
	}
});


function validate_checkbox(dispcity)
{
	
	var selrec=($('.selectedcity:checkbox:checked').length);
	
	if(selrec>parseInt(dispcity))
	{
		alert("Only "+dispcity+" city allowed.");	
		return false;
	}
	
		
		
}


function check_username(username, fieldtype, method_url, container)
{
  var ajax_url = site_url + method_url;

  $.ajax({
    type: "POST",
    url: ajax_url,
    dataType: "html",
    data: "username=" + username+"&fieldtype="+fieldtype,
    cache: false,
    success:
            function(data)
            {
              $("#" + container).htmll(data);
            }

  });
}

 function is_decimal(obj,lebel)
{
	var reg=/^[0-9\.]*$/;
	val=obj.value;
	validate_val=reg.test(val);
	val=parseFloat(val).toFixed(2);
	
	if(!lebel)
	{
		lebel='This field';
	}
	else
	{
		lebel='The '+lebel;
	}
	
	if(isNaN(val))
	{
		obj.value='';
	}
	else if(validate_val==false)
	{
		alert(lebel+" can't contain characters or any special characters such as , . ' % * ' | \ / ? < > etc.' ");
		obj.value='';
		obj.focus();
	}
}

function is_natural(obj,lebel)
{
	var reg=/^[0-9]*$/;
	val=obj.value;
	validate_val=reg.test(val);
	val=parseInt(val);
	if(!lebel)
	{
		lebel='This field';
	}
	else
	{
		lebel='The '+lebel;
	}
	if(isNaN(val))
	{
		obj.value='';
	}
	else if(validate_val==false)
	{
		alert(lebel+" can't contain characters or any special characters such as , . ' % * ' | \ / ? < > etc.'");
		obj.value='';
		obj.focus();
	}
}

function get_tokens(fld,respid)
{
  var ajax_url = site_url + 'classifieds/get_avl_tokens';

  $.ajax({
    type: "POST",
    url: ajax_url,
    dataType: "html",
    data: "gtfld=" + fld,
    cache: false,
    success:
            function(data)
            {
              $("#" + respid).htmll(data);
            }

  });
}


function shareads(url,socialtype,adsid)
{
	
	var ajax_url = site_url + 'home/ads_share_on_social';

  $.ajax({
    type: "POST",
    url: ajax_url,
    dataType: "html",
    data: "adsid=" + adsid+'&socialtype='+socialtype,
    cache: false,
    success:
            function(data)
            {
              window.open(url,'_blank');
            }

  });
	
}


function shareFB(url)
	{
		 window.open(
				'https://www.facebook.com/sharer/sharer.php?u='+encodeURIComponent(url), 
				'facebook-share-dialog', 
				'width=626,height=436'); 
	} 
	function shareTwitter(url,text)
	{
		 window.open(
				'https://www.twitter.com/share?text='+text+'&url='+encodeURIComponent(url), 
				'twitter-share-dialog', 
				'width=626,height=436'); 
	}
	
	function shareIn(url,title,summary)
	{
		 window.open(
				'https://www.linkedin.com/shareArticle?title='+title+'&summary='+summary+'&mini=true&url='+encodeURIComponent(url), 
				'linkedin-share-dialog', 
				'width=626,height=436'); 
	}
	
	function shareGplus(url)
	{
		 window.open(
				'https://plus.google.com/share?url='+encodeURIComponent(url), 
				'Google-share-dialog', 
				'width=626,height=436'); 
	}
	
	function sharePinterest(url,full_image_path)
	{
		 window.open(
				'https://pinterest.com/pin/create/button/?url='+encodeURIComponent(url)+'&amp;media='+full_image_path, 
				'Pinterest-share-dialog', 
				'width=626,height=436'); 
	}
	
	function remove_filtered_data(deldata,hidden_fld_id,frm_id)
	{
		var hidden_fld_value;
		var hidden_fld_value_arr;
		if(deldata!='')
		{
			hidden_fld_value= $('#'+hidden_fld_id).val();
			hidden_fld_value_arr=hidden_fld_value.split(',');
			var i=hidden_fld_value_arr.indexOf(deldata);
			if(i !=-1)
			{
				hidden_fld_value_arr.splice(i,1);
			}
			hidden_fld_value=hidden_fld_value_arr.join(',');
			$('#'+hidden_fld_id).val(hidden_fld_value);
			$('#'+frm_id).submit();
		}
	}
	
	function remove_selectbox_data(deldata,hidden_fld_id)
	{
		var hidden_fld_value;
		var hidden_fld_value_arr;
		if(deldata!='')
		{
			hidden_fld_value= $('#'+hidden_fld_id).val();
			hidden_fld_value_arr=hidden_fld_value.split(',');
			var i=hidden_fld_value_arr.indexOf(deldata);
			if(i !=-1)
			{
				hidden_fld_value_arr.splice(i,1);
			}
			hidden_fld_value=hidden_fld_value_arr.join(',');
			$('#'+hidden_fld_id).val(hidden_fld_value);
			
		}
	}
	
	function selectbox_left_filter_remove(attr_val_id,attrval_id,frm_id)
	{
		remove_selectbox_data(attr_val_id,'leftselectbox_ids');
		remove_selectbox_data(attrval_id,'attr_val_selectbox');
		
		$('#'+frm_id).submit();
	}
	
	function checkbox_left_filter_remove(attr_val_id,attrval_id,frm_id)
	{
		remove_selectbox_data(attr_val_id,'leftcheckbox_ids');
		remove_selectbox_data(attrval_id,'attr_val');
		
		$('#'+frm_id).submit();
	}
	
	function clear_brand(clearclass)
	{
		var attrname=$('.'+clearclass).attr('name');
		var matches = new Array();
		$("."+clearclass+":checked").each(function(mkey,mval) {
				matches.push($(mval).val());
		});
		
		var attr_val_id;
		for(var i=0;i<matches.length;i++)
		{
			attr_val_id=attrname+'-'+matches[i];
			
			remove_selectbox_data(attr_val_id,'leftcheckbox_ids');
			remove_selectbox_data(matches[i],'attr_val');
		}
		$('.'+clearclass).removeAttr('checked');
		$('#myform').submit();
	
	}
	
	
	
	function bind_category_faq(catid,faqtype,response_container)
	{
		
		var ajax_url = site_url + 'help/bind_help_faq';

		$.ajax({
			type: "POST",
			url: ajax_url,
			dataType: "html",
			data: "catid=" + catid+"&faqtype="+faqtype,
			cache: false,
			success:
							function(data)
							{
								$('#'+response_container).htmll(data);
							}
	
		});
		
	}
	
	function accept_interger_value(fldid)
	{
		var price;
		var reg=/^[0-9]*$/;
		price=$('#'+fldid).val();
		validate_val=reg.test(price);
		if(validate_val==false)
		{
			$('#'+fldid).val('');
			//return false;
		}
	}
	
	function accept_valid_price(fldid)
	{
		var price;
		var reg=/^[0-9\.]*$/;
		price=$('#'+fldid).val();
		validate_val=reg.test(price);
		if(validate_val==false)
		{
			$('#'+fldid).val('');
			//return false;
		}
	}
	
	function compare_price(fldid1,fldid2)
	{
		if(parseInt($('#'+fldid1).val())>parseInt($('#'+fldid2).val()))
		{
			$('#'+fldid1).val('');
			return false;
		}
	}
	
	function compare_price_parent(fldid1,fldid2)
	{
		if(parseInt($('#'+fldid1).val())<parseInt($('#'+fldid2).val()))
		{
			$('#'+fldid2).val('');
			return false;
		}
	}
	
	function get_saved_value(method_url,container_id,loader_container)
	{
		var discount_price;
		var price;
		price=$('#mrp').val();
		discount_price=$('#selling_price').val();
		
		 
		if(price!='')
		{
		
		showloader(loader_container);
		$("#"+container_id).hide();  
		
		var ajax_url=site_url+method_url;
		
			$.ajax({
			type: "POST",
			url: ajax_url,
			dataType: "html",
			data: "dprice="+discount_price+"&price="+price,
			cache:false,
			success:
				function(data)
				{
					$("#"+container_id).show();
					$("#"+container_id).htmll(data);
					hideloader(loader_container);					
				}
				
			}); 
		}
	}
	
$( document ).ready(function() {
	$(".pricefld").keyup(function () {
			$(this).next('.pricefld').focus();
	});	
});	


function update_product_weight(product_id,method_url)
{
	var inputweight;
	var inputweightunit;
	
	inputweight 		=	$('#product_weight'+product_id).val();
	inputweightunit =	$('#product_weight_unit'+product_id).val();
	
	var ajax_url=site_url+method_url;
		
			$.ajax({
			type: "POST",
			url: ajax_url,
			dataType: "html",
			data: "pweight="+inputweight+"&weightunit="+inputweightunit+"&product_id="+product_id,
			cache:false,
			success:
				function(data)
				{
					$("#weightshow"+product_id).show();
					$("#smp_box"+product_id).hide();
					var resp=data.split('~');
					$("#weightshow"+product_id).htmll(resp[0]);
					$("#showprice"+product_id).htmll(resp[1]);
					
					
				}
				
			});
	
}

function update_price(product_id,method_url)
{
	var retail_price;
	var mrp;
	var flag;
	
	flag=1;
	
	retail_price 	=	parseInt($('#retail_price'+product_id).val());	
	mrp 					=	parseInt($('#mrp'+product_id).val());
	
	if(retail_price>mrp)
	{
		flag=2;
		alert('Product MRP is Rs. '+mrp+' so retail price should be always less than mrp value.');
	}
	
	if(flag==1){
	
	var ajax_url=site_url+method_url;
		
			$.ajax({
			type: "POST",
			url: ajax_url,
			dataType: "html",
			data: "mrp="+mrp+"&retail_price="+retail_price+"&product_id="+product_id,
			cache:false,
			success:
				function(data)
				{
					$('#priceerror'+product_id).htmll('');
					$("#price_form_container"+product_id).hide();
					if(data=='error_found')
					{
						$('#priceerror'+product_id).htmll("Price not updated because calculated selling price become greater than MRP.");
					}
					else
					{
						var resp=data.split("~");
						$("#showprice"+product_id).htmll(resp[0]);
						$("#retailprice"+product_id).htmll(resp[1]);
						
					}
				}
			});
	//$(this).parent().hide();
	}
}

function redirect_on_stock(pid)
{
	var redirect_url;
	redirect_url=site_url+"seller/catalog/manage_stock/"+pid;
	window.location.href=redirect_url;
}

function calculate_shipping(weight,method_url)
{
	var mrp;
	var retail_price;
	var cat_id;
	
	cat_id=$('select[name=cat_id]').val();
	
	mrp 						= $('#mrp').val();
	retail_price 		= $('#retail_price').val();
	var product_weight;
	var free_shipping="";	
	
	var selected = $("input[type='radio'][name='free_shipping']:checked");
	if (selected.length > 0) {
			free_shipping = selected.val();
	}
	
	product_weight=weight;	
	$('#selling_price_error').htmll('');
	
	//if(parseInt(free_shipping)==2){
		$("#shipping_price").val('Updating...');
		$("#selling_price").val('Updating...');
	
		var ajax_url=site_url+method_url;
		
			$.ajax({
			type: "POST",
			url: ajax_url,
			dataType: "html",
			data: "product_weight="+product_weight+"&mrp="+mrp+"&retail_price="+retail_price+"&shipping_type="+free_shipping+"&cat_id="+cat_id,
			cache:false,
			success:
				function(data)
				{
					var resp=data.split('~');
					$("#shipping_price").val(resp[0]);
					$("#selling_price").val(resp[1]);
					if(parseInt(mrp)<parseInt(resp[1]))
					{
						$('#selling_price_error').htmll('Selling price should be less than MRP price so please update MRP or retail price.');
					}
					get_saved_value('remote/get_save_value','saved_value','loading_saved_value');
				}
			});
	//}
	
}


function cal_selling(retailprice,method_url)
{
	var mrp;
	var retail_price;	
	var shipping_price;	
	var cat_id;
	
	cat_id=$('select[name=cat_id]').val();	
	
	mrp 						= $('#mrp').val();
	retail_price 		= retailprice;
	shipping_price		=$('#shipping_price').val();
			
	
	$('#selling_price_error').htmll('');	
	$("#selling_price").val('Updating...');
	
	if(parseInt(mrp)>0)
	{
		var ajax_url=site_url+method_url;
		
			$.ajax({
			type: "POST",
			url: ajax_url,
			dataType: "html",
			data: "shipping_price="+shipping_price+"&mrp="+mrp+"&retail_price="+retail_price+"&cat_id="+cat_id,
			cache:false,
			success:
				function(data)
				{
					$("#selling_price").val(data);
					//alert(parseInt(mrp));
					//alert(parseInt(data));
					if(parseInt(mrp)<parseInt(data))
					{
						$('#selling_price_error').htmll('Selling price should be less than MRP price so please update MRP or retail price.');
					}
					get_saved_value('remote/get_save_value','saved_value','loading_saved_value');
				}
			});
			
			
	}
	
	
}

function cod_availability(mid)
{
	var pincode
	pincode = $('#pin').val();
	showloader('loader_id');
	
	var ajax_url=site_url+'remote/check_cod_availability';
		
			$.ajax({
			type: "POST",
			url: ajax_url,
			dataType: "html",
			data: "pincode="+pincode+"&mid="+mid,
			cache:false,
			success:
				function(data)
				{
					var resp=data.split("~");
					$("#cod_msg_resp").htmll(resp[0]);
					$("#cbtn").htmll(resp[1]);
					hideloader('loader_id');
				}
			});
	
}

// added by sk on 22-6-2015
function fill_custom_data(srchkey,srchval)
{
	$('#'+srchkey).val(srchval);		
}

function calculate_combo_price(loader_id,resp_container)
{
	var pid;
	var comboid;
	var comboprodid;
	
	pid 				= $('#main_product_id').val();
	comboid 		= $('#combo_id').val();
	comboprodid = $('#combo_product_id').val();
	
	showloader(loader_id);
	
	var ajax_url=site_url+'remote/calculate_combo_price';
		
			$.ajax({
			type: "POST",
			url: ajax_url,
			dataType: "html",
			data: "pid="+pid+"&cid="+comboid+"&cpid="+comboprodid,
			cache:false,
			success:
				function(data)
				{
					$("#"+resp_container).htmll(data);
					hideloader(loader_id);
				}
			});
}

function combo_main_product_click(checkedval,mpid,comboid,loader_id,resp_container,comboprodcls)
{
	$('#combo_id').val(comboid);
	if($('#'+mpid).attr('checked')=='checked')
	{
		$('#main_product_id').val(checkedval);
	}
	else
	{
		$('#main_product_id').val('');
	}
	
	////
	var arrval=new Array();
	var values = $('input:checkbox:checked.'+comboprodcls).map(function () {
  	return this.value;
	}).get();
	
	arrval.push(values);
	
	$('#combo_product_id').val(arrval.join(","));
	
	/////
	
	calculate_combo_price(loader_id,resp_container);
}

function combo_product_click(comboprodcls,comboid,loader_id,resp_container)
{
	$('#combo_id').val(comboid);
	var arrval=new Array();
	var values = $('input:checkbox:checked.'+comboprodcls).map(function () {
  	return this.value;
	}).get();
	
	arrval.push(values);
	
	$('#combo_product_id').val(arrval.join(","));
	
	calculate_combo_price(loader_id,resp_container);
}

function add_to_cart()
{
	var is_size;
	var size_id;
	var color_id
	
	$('#cartresp').htmll('');
	showloader('cart_loader_id');
	is_size=$('#is_size').val();
	size_id=$('#size_id').val();
	color_id=$('#color_id').val();
	
	if(is_size!='' && size_id=='')
	{
		$('#cartresp').htmll('Please select a size.');
		hideloader('cart_loader_id');
	}
	else if(is_size!='' && size_id!='' && color_id!='')
	{
		var product_id;
		product_id = $('#pid').val();
		
		
		var ajax_url=site_url+'remote/check_qty_availability';
			
				$.ajax({
				type: "POST",
				url: ajax_url,
				dataType: "html",
				data: "pid="+product_id+"&sid="+size_id+"&cid="+color_id,
				cache:false,
				success:
					function(data)
					{
						if(data=='noavl')
						{
							$('#cartresp').htmll('Product not available for selected size.');
						}
						else
						{
							$('#addtocart').submit();
						}
						hideloader('cart_loader_id');
					}
				});
	}
	else if(is_size!='' && size_id!='')
	{
		var product_id;
		product_id = $('#pid').val();
		
		
		var ajax_url=site_url+'remote/check_qty_availability';
			
				$.ajax({
				type: "POST",
				url: ajax_url,
				dataType: "html",
				data: "pid="+product_id+"&sid="+size_id,
				cache:false,
				success:
					function(data)
					{
						if(data=='noavl')
						{
							$('#cartresp').htmll('Product not available for selected size.');
						}
						else
						{
							$('#addtocart').submit();
						}
						hideloader('cart_loader_id');
					}
				});
	}
	else if(color_id!='')
	{
		var product_id;
		product_id = $('#pid').val();
		
		
		var ajax_url=site_url+'remote/check_qty_availability';
			
				$.ajax({
				type: "POST",
				url: ajax_url,
				dataType: "html",
				data: "pid="+product_id+"&cid="+color_id,
				cache:false,
				success:
					function(data)
					{
						if(data=='noavl')
						{
							$('#cartresp').htmll('Product not available for selected size.');
						}
						else
						{
							$('#addtocart').submit();
						}
						hideloader('cart_loader_id');
					}
				});
	}
	else
	{
		$('#addtocart').submit();
	}
	
}

function apply_coupon()
{
	showloader('c_loader');
	var coupon=$('#coupon').val();
	if(coupon!='')
	{
		var ajax_url=site_url+'cart/apply_coupon';
			
		$.ajax({
		type: "POST",
		url: ajax_url,
		dataType: "html",
		data: "coupon="+coupon,
		cache:false,
		success:
			function(data)
			{
				var resp=data.split('~');
				$('#c_resp').htmll(resp[0]);
				$('.net_pay_resp').htmll(resp[1]);
				
				if(resp[2]!=''){
					//$('.coupon_discount').show();
					$('#discount_resp').htmll(resp[2]);
				}
				hideloader('c_loader');
			}
		});
	}
	else
	{
		$('#c_resp').htmll('<span style="color:red;">Please enter coupon code.</span>');
		hideloader('c_loader');
	}
}

function apply_points()
{	
	showloader('points_loader');
	var points=$('#points').val();
	if(points!='')
	{
		var ajax_url=site_url+'cart/apply_points';
			
		$.ajax({
		type: "POST",
		url: ajax_url,
		dataType: "html",
		data: "points="+points,
		cache:false,
		success:
			function(data)
			{
				var resp=data.split('~');
				$('#points_resp').htmll(resp[0]);
				$('.net_pay_resp').htmll(resp[1]);
				
				if(resp[2]!=''){
					$('.points_discount').show();
					$('#points_disc_resp').htmll(resp[2]);
				}
				hideloader('points_loader');
			}
		});
	}
	else
	{
		$('#points_resp').htmll('<span style="color:red;">Please enter available credit points to redeem.</span>');
		hideloader('points_loader');
	}
}

function send_sms_for_cod()
{
	var ajax_url=site_url+'cart/send_cod_verification_sms';
			
		$.ajax({
		type: "POST",
		url: ajax_url,
		dataType: "html",
		data: "dmy=1",
		cache:false,
		success:
			function(data)
			{
				//alert(data);
			}
		});
}

function set_delivery_status(order_no,delivery_status)
{
	 if(confirm("Are you sure you want to set delivery status?")){
        window.location.href=site_url+'seller/orders/set_delivery_status/?ono='+order_no+'&dst='+delivery_status;
    }
    else{
        return false;
    }
}

function set_resolve(resolvestatus,enqid)
{
	 if(confirm("Are you sure you want to set resolve status?")){
        window.location.href=site_url+'buyer/orders/set_resolve_status/?rstatus='+resolvestatus+'&enqid='+enqid;
    }
    else{
        return false;
    }
}

function showcodcontainer(selfval)
{
	var is_freeshipping;
	
	is_freeshipping= $('input[name=free_shipping]:checked').val();
	
	if(parseInt(is_freeshipping)==1 && parseInt(selfval)==1)
	{
		$('#codcharge').show();
	}
	
}

function recalculate_netpayable(codcharge)
{
	var ajax_url=site_url+'cart/recalculate_netpayable';
			
		$.ajax({
		type: "POST",
		url: ajax_url,
		dataType: "html",
		data: "cc="+codcharge,
		cache:false,
		success:
			function(data)
			{
				var resp;
				resp=data.split('~');
				$('.net_pay_resp').htmll(resp[0]);
				$('#cod_error').htmll(resp[1]);
				if(resp[1]!='')
				{
					$('.cod').hide();
					$('#pay_mode').attr('checked',false);
				}
			}
		});
}

///// 17-6-2015 ///////////
function update_product_list(cat_id)
{
	showloader('loader_id');
	checkstr = '';
	i=0;
	j=0;
	attr_name='';
	brandarr=new Array();
	price_range=$('#hidden_amt').val();
	pagetype=$('#pagetype').val();
	offer_type=$('#offer_type').val();
	recent_view=$('#recent_view').val();
	recommend=$('#recommend').val();
	hot=$('#hot').val();
	featured=$('#featured').val();
	new_prd=$('#new').val();
	sort_by=$('#sort_by').val();
	
	keyword=$('#search_keyword').val();
	category=$('#search_category').val();
	
	if(sort_by==undefined){
		sort_by='';
	}
	
	
	//pick all checked checkboxes values
	$('input:checkbox.prdleft').each(function () {
     
	 if(this.checked){
	 
	   var sThisVal = (this.checked ? $(this).val() : "");
	 
	   if(sThisVal!=''){
	
			if($(this).attr('name')!='brand[]'){
				attr_name=(attr_name=='')?$(this).attr('name'):attr_name;
				
				if($(this).attr('name').toString()!=attr_name.toString()){
					checkstr+="~";
					attr_name=$(this).attr('name');
				}else{
					checkstr+=",";
				}
				checkstr+=sThisVal
				i++;
				
			}else{
				
				brandarr[j]=sThisVal;
				j++;
			
			}
		
	   }
	   
  	}
	}
	);
	//end
	
	checkstr = checkstr.slice( 1 );
	
	brandstr = brandarr.join(",");
	
	var ajax_url=site_url+'products/get_ajax_products';
	
			$.ajax({
			type: "POST",
			url: ajax_url,
			dataType: "html",
			data: "checkstr="+checkstr+"&cat_id="+cat_id+"&brandstr="+brandstr+"&price_range="+price_range+"&pagetype="+pagetype+"&offer_type="+offer_type+"&recent_view="+recent_view+"&recommend="+recommend+"&hot="+hot+"&sort_by="+sort_by+"&keyword="+keyword+"&category="+category+"&featured="+featured+"&new="+new_prd,
			cache:false,
			success:
				function(data)
				{
					qrystr="checkstr="+checkstr+"&cat_id="+cat_id+"&brandstr="+brandstr+"&price_range="+price_range+"&pagetype="+pagetype+"&offer_type="+offer_type+"&recent_view="+recent_view+"&recommend="+recommend+"&hot="+hot+"&sort_by="+sort_by+"&keyword="+keyword+"&category="+category+"&featured="+featured+"&new="+new_prd
					$('#qrystr').val(qrystr);
					$("#prodListingContainer").htmll(data);
					
					display_selected_attr(qrystr);
					
					hideloader('loader_id');
				}
			});
	
}


function display_selected_attr(selected_attrs)
{
	
	var ajax_url=site_url+'products/display_selected_attrs';
	
			$.ajax({
			type: "POST",
			url: ajax_url,
			dataType: "html",
			data: selected_attrs,
			cache:false,
			success:
				function(data)
				{
					$(".search_params").htmll(data);
				}
			});
}



function add_to_compare(product_id,obj,cat_id)
{
	
	var ajax_url=site_url+'products/add_to_compare';
	compare_id=$("#compare_id").val();
	
	compare_cat_id=  $("#compare_cat_id").val();
	if(compare_cat_id!=cat_id && compare_id>0){
		alert('Different category products can not compare');
		obj.checked=false;
		return false;
	}else{
		if(obj.checked==true || obj.name=='detail_compare'){
			$("#compare_cat_id").val(cat_id);
			compare_id++;	
			$.ajax({
			type: "POST",
			url: ajax_url,
			dataType: "html",
			data: "product_id="+product_id+"&compare_id="+compare_id,
			cache:false,
			success:
				function(data)
				{
					$("#comparebox_replace_id").htmll(data);
					if(compare_id>2){
						$("input.comparedckbx").attr('disabled','disabled');
					}
					//$("#compare_id").val(compare_id);
				}
			});
			
		}else{
			compare_id=$("#compare_id").val();
			compare_id--;
			$("#prd"+product_id).htmll('');
			delete_compare_prd(compare_id,product_id);
		}
	}
	
}
function delete_compare_prd(compare_id_remove,product_id){
	compare_id=$("#compare_id").val();
	compare_id--;
	if(compare_id==0){
		$("#compare_cat_id").val(0);
	}
	if(compare_id<3){
		$("input.comparedckbx").removeAttr('disabled');
	}
	$("#compare_id").val(compare_id);
	//only for reset array of compare productss
	var ajax_url=site_url+'products/delete_compare';
	$.ajax({
		type: "POST",
		url: ajax_url,
		dataType: "html",
		data: "product_id="+product_id,
		cache:false,
		success:
			function(data)
			{
				$("#comparebox_replace_id").htmll(data);
			}
		});
	
	
	$("#prdchk"+product_id).attr("checked",false);
	$("#comp_box"+compare_id_remove).htmll('<a class="pt12 db" href="details.html">Add tem</a>');
}
function check_compare(){
	comp_cal=$('#compare_id').val();
	if(comp_cal>1){
		return true;
	}else{
		alert('Select at lease 2 products for compares');
		return false
	}
}
function increase_compare_id(){
	compare_id=$("#compare_id").val();
	compare_id++;
	$("#compare_id").val(compare_id);
}

//Classified compare js
 function add_to_compare_classified(product_id,obj,cat_id)
{
	
	var ajax_url=site_url+'classifieds/add_to_compare';
	compare_id=$("#compare_id").val();
	
	compare_cat_id=  $("#compare_cat_id").val();
	if(compare_cat_id!=cat_id && compare_id>0){
		alert('Different category products can not compare');
		obj.checked=false;
		return false;
	}else{
		if(obj.checked==true || obj.name=='detail_compare'){
			$("#compare_cat_id").val(cat_id);
			compare_id++;	
			$.ajax({
			type: "POST",
			url: ajax_url,
			dataType: "html",
			data: "product_id="+product_id+"&compare_id="+compare_id,
			cache:false,
			success:
				function(data)
				{
					$("#comparebox_replace_id").htmll(data);
					if(compare_id>2){
						$("input.comparedckbx").attr('disabled','disabled');
					}
					//$("#compare_id").val(compare_id);
				}
			});
			
		}else{
			compare_id=$("#compare_id").val();
			compare_id--;
			$("#prd"+product_id).htmll('');
			delete_compare_prd_classified(compare_id,product_id);
		}
	}
	
}

function delete_compare_prd_classified(compare_id_remove,product_id){
	compare_id=$("#compare_id").val();
	compare_id--;
	if(compare_id==0){
		$("#compare_cat_id").val(0);
	}
	if(compare_id<3){
		$("input.comparedckbx").removeAttr('disabled');
	}
	$("#compare_id").val(compare_id);
	//only for reset array of compare productss
	var ajax_url=site_url+'classifieds/delete_compare';
	$.ajax({
		type: "POST",
		url: ajax_url,
		dataType: "html",
		data: "product_id="+product_id,
		cache:false,
		success:
			function(data)
			{
				$("#comparebox_replace_id").htmll(data);
			}
		});
	
	$("#prdchk"+product_id).attr("checked",false);
	$("#comp_box"+compare_id_remove).htmll('<a class="pt12 db" href="details.html">Add tem</a>');
}




//End 

//classified update list

function update_classified_list(cat_id)
{
	showloader('loader_id');
	checkstr = '';
	i=0;
	j=0;
	k=0;
	l=0;
	m=0;
	
	attr_name='';
	posted_within=new Array();
	price=new Array();
	condition=new Array();
	locality=new Array();
	price_range=$('#hidden_amt').val();
	pagetype=$('#pagetype').val();
	sort_by=$('#sort_by').val();
	featured=$('#featured').val();
	sort_by_date=$('#sort_by_date').val();
	keyword=$('#search_keyword').val();
	category=$('#search_category').val();
	
	if(sort_by==undefined){
		sort_by='';
	}
	
	
	//pick all checked checkboxes values
	$('input:checkbox.prdleft').each(function () {
     
	 if(this.checked){
	 
	   var sThisVal = (this.checked ? $(this).val() : "");
	 
	   if(sThisVal!=''){
	
				if($(this).attr('name')=='posted_within[]'){
					posted_within[j]=sThisVal;
					j++;
				}
				else if($(this).attr('name')=='price[]'){
					price[k]=sThisVal;
					k++;
				}
				else if($(this).attr('name')=='condition[]'){
					condition[l]=sThisVal;
					l++;
				}
				else if($(this).attr('name')=='location[]'){
					locality[m]=sThisVal;
					m++;
				}
				else{
					attr_name=(attr_name=='')?$(this).attr('name'):attr_name;
					
					if($(this).attr('name').toString()!=attr_name.toString()){
						checkstr+="~";
						attr_name=$(this).attr('name');
					}else{
						checkstr+=",";
					}
					checkstr+=sThisVal
					i++;
				}
				
	   }
	   
  	}
	}
	);
	//end
	
	checkstr = checkstr.slice( 1 );
	
	posted_within_str = posted_within.join(",");
	
	price_str = price.join(",");
	
	condition_str = condition.join(",");
	
	locality_str = locality.join(",");
	
	var ajax_url=site_url+'classifieds/get_ajax_products';
	
			$.ajax({
			type: "POST",
			url: ajax_url,
			dataType: "html",
			data: "checkstr="+checkstr+"&cat_id="+cat_id+"&price_range="+price_range+"&sort_by="+sort_by+"&posted_within="+posted_within_str+"&price="+price_str+"&condition="+condition_str+"&location="+locality_str+"&sort_by_date="+sort_by_date+"&keyword="+keyword+"&category="+category+"&featured="+featured,
			cache:false,
			success:
				function(data)
				{
					qrystr="checkstr="+checkstr+"&cat_id="+cat_id+"&price_range="+price_range+"&sort_by="+sort_by+"&posted_within="+posted_within_str+"&price="+price_str+"&condition="+condition_str+"&location="+locality_str+"&sort_by_date="+sort_by_date+"&keyword="+keyword+"&category="+category+"&featured="+featured
					$('#qrystr').val(qrystr);
					$("#prodListingContainer").htmll(data);
					
					display_selected_attr(qrystr);
					
					hideloader('loader_id');
				}
			});
	
}

function individual_section_clear(clearid,frmid)
{
	$('#'+clearid).val('');
	$('#'+frmid).submit();
}

function newsletterfrm(frm)
{
	
	if(frm.subscr_email.value=='' || frm.subscr_email.value=='Enter your email address'){
		alert("Please enter email address.");
		frm.subscr_email.focus();
		return false;	
	}
	if(frm.subscr_email.value!=''){
		if(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(frm.subscr_email.value)){
			}else{
				alert("Please Enter Valid Email Address!");
				frm.subscr_email.focus();
				return false;
			}
	}
}

function instockserach()
{
	if($('#instock').attr('checked'))
	{
		$("#isavl").val('1');
	}
	else
	{
		$("#isavl").val('');
	}
	$('#searchfrm').submit();
}

function add_more_form()
{
	var core_curr_form=$('#curr_form').val();
	curr_form=parseInt(core_curr_form)+1;
	//alert(curr_form);
	$('#curr_form').val(curr_form);
	
	var ajax_url=site_url+'e_gift_voucher/add_more_form';
	$.ajax({
		type: "POST",
		url: ajax_url,
		dataType: "html",
		data: "no_of_form="+curr_form+"&cnt="+curr_form,
		cache:false,
		success:
			function(data)
			{
				$("#main_container").append(data);
				if(parseInt(curr_form)<5)
				{
					$('#addmore').show();					
				}
				else
				{
					$('#addmore').hide();
				}
			}
		});
	
}




//end 